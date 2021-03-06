import { LessThan } from 'typeorm';
import { getDB } from '../db/db';
import { Chat } from '../model/entity/Chat';

const saveChat = async (userId: number, postId: number, msg: string) => {
  const db = await getDB().get();
  const newChat = db.manager.create(Chat, { userId, postId, msg });
  return await db.manager.save(newChat);
};

const saveImg = async (userId: number, postId: number, img: string) => {
  const db = await getDB().get();
  const newImg = db.manager.create(Chat, { userId, postId, img });
  return await db.manager.save(newImg);
};

const getChats = async (postId: string, limit: string | undefined, cursor: string | null = null) => {
  const db = await getDB().get();
  let query = `
      SELECT chat.id as id, chat.userId as userId, chat.postId as postId, chat.msg as msg, chat.created_at as created_at, chat.img as img, user.name as name
      FROM chat
      LEFT JOIN user
      ON chat.userId = user.id
    `;
  let condition = 'WHERE ';
  if (cursor === null) condition += `chat.postId = ${postId} `;
  else condition += `chat.postId = ${postId} AND chat.id < ${cursor} `;
  condition += `ORDER BY chat.created_at DESC `;
  condition += `LIMIT ${limit}`;
  const chats = await db.manager.query(query + condition);
  return chats;
};

export default { saveChat, getChats, saveImg };
