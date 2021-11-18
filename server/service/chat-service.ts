import { LessThan } from 'typeorm';
import { getDB } from '../db/db';
import { Chat } from '../model/entity/Chat';

const saveChat = async (userId: number, postId: number, msg: string) => {
  const db = await getDB().get();

  const newChat = db.manager.create(Chat, {
    userId,
    postId,
    msg
  });
  try {
    db.manager.save(newChat);
  } catch (e) {
    console.log(e);
  }
};

const getChats = async (
  postId: string,
  limit: string | undefined,
  cursor: string | null = null
) => {
  try {
    const whereOption =
      cursor !== null
        ? { postId: Number(postId), id: LessThan(Number(cursor)) }
        : { postId: Number(postId) };
    const db = await getDB().get();
    const chats = db.manager.find(Chat, {
      where: whereOption,
      order: {
        created_at: 'DESC'
      },
      take: Number(limit)
    });
    return chats;
  } catch (e) {
    console.log(e);
  }
};

export default { saveChat, getChats };
