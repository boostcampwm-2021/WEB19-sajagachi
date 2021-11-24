import { getDB } from '../db/db';
import { Participant } from '../model/entity/Participant';

const getParticipantNum = async (postId: number) => {
  const db = await getDB().get();
  const result = await db.manager.count(Participant, {
    where: { postId }
  });
  if (result === undefined) throw new Error(`${postId}번째 게시글 사용자수를 가지고오는데 오류가 발생했습니다.`);

  return result;
};

const getParticipants = async (postId: number) => {
  const db = await getDB().get();
  const result = await db.manager.find(Participant, {
    where: { postId },
    relations: ['user']
  });
  return result;
};

const getParticipant = async (postId: number, userId: number) => {
  const db = await getDB().get();
  const result = await db.manager.findOne(Participant, { postId, userId });
  return result;
};

const saveParticipant = async (userId: number, postId: number) => {
  const db = await getDB().get();

  const newParticipant = db.manager.create(Participant, {
    userId,
    postId
  });
  const createdParticipant = await db.manager.save(newParticipant);

  return createdParticipant;
};

const updatePoint = async (postId: number, userId: number, newPoint: number | null) => {
  const db = await getDB().get();
  const result = await db.manager.update(
    Participant,
    { postId, userId },
    {
      point: newPoint
    }
  );
  return result;
};

const deleteParticipant = async (postId: number, userId: number) => {
  const db = await getDB().get();
  const result = await db.manager.delete(Participant, { postId, userId });
  return result;
};

const checkParticipation = async (postId: number, userId: number) => {
  const db = await getDB().get();
  const result = await db.manager.findOne(Participant, {
    where: { postId, userId }
  });
  return !(result === undefined);
};

const finishPost = async (postId: number, hostId: number) => {
  const db = await getDB().get();
  const sql = `
  UPDATE user SET point = point + (SELECT SUM(p.point) as sum
                          FROM participant p
                          WHERE postId = ${postId}
                          GROUP BY postId)
  WHERE id = ${hostId}
  `;
  const result = await db.manager.query(sql);
  return result;
};

const getParticipationPosts = async (userId: number, limit: string | undefined, cursor: string | null = null) => {
  const db = await getDB().get();
  const sql = `select p.id, p.title, p.content, p.capacity, p.deadline, p.finished, p.lat, p.long, category.name as category from (select postId from participant where userId = ${userId}) pa left join post p on pa.postId = p.id LEFT JOIN category
	ON p.categoryId = category.id`;
  let condition = ' ';
  if (cursor !== null) condition += `WHERE p.id < ${cursor} `;
  condition += `ORDER BY p.id DESC `;
  condition += `LIMIT ${limit}`;
  const result = await db.manager.query(sql + condition);
  return result;
};

export default {
  getParticipantNum,
  getParticipants,
  saveParticipant,
  getParticipant,
  updatePoint,
  deleteParticipant,
  checkParticipation,
  finishPost,
  getParticipationPosts
};
