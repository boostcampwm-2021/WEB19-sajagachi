import { Request, Response } from 'express';
import chatService from '../service/chat-service';

export const getChats = async (req: Request, res: Response, next: Function) => {
  try {
    const { post_id } = req.params;
    const { limit, cursor } = req.query;
    const chats = await chatService.getChats(
      post_id,
      limit as string,
      cursor as string
    );
    res.json(chats);
  } catch (err: any) {
    next({ statusCode: 500, message: err.message });
  }
};
