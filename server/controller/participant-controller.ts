import { Request, Response } from 'express';
import participantService from '../service/participant-service';
import postService from '../service/post-service';
import { SYSTEM_MSG_TYPE, processSystemMsg } from '../socket/chat';
import ERROR from '../util/error';

export const getParticipants = async (req: Request, res: Response, next: Function) => {
  try {
    const participants = await participantService.getParticipants(+req.params.post_id);
    res.json(participants);
  } catch (err: any) {
    next(ERROR.DB_READ_FAIL);
  }
};
export type ErrorType = {
  status: number;
  message: string;
};

export const createParticipant = async (req: Request, res: Response, next: Function) => {
  try {
    const session = req.session;
    if (!session.userId) return next(ERROR.NOT_LOGGED_IN);
    const { post_id } = req.params;
    const finished = await postService.getFinished(+post_id);
    if (finished) return next(ERROR.ENTER_FAIL_FINISHED);
    const participantNum = await participantService.getParticipantNum(+post_id);
    const capacity = await postService.getCapacity(+post_id);
    if (capacity === undefined) return next(ERROR.INVALID_POST_ID);
    if (capacity !== null && participantNum > capacity) return next(ERROR.ENTER_FAIL_FINISHED);
    else {
      const createdParticipant = await participantService.saveParticipant(Number(session.userId), +post_id);
      processSystemMsg(req.app.get('io'), SYSTEM_MSG_TYPE.JOIN, +post_id, String(session.userName));
      res.json(createdParticipant);
    }
  } catch (err: any) {
    next(ERROR.DB_WRITE_FAIL);
  }
};

export const getParticipationPosts = async (req: Request, res: Response, next: Function) => {
  try {
    const { userId } = req.params;
    const { limit, cursor } = req.query;
    const participationPosts = await participantService.getParticipationPosts(
      Number(userId),
      limit as string,
      cursor as string
    );
    const result: any = await Promise.all(
      participationPosts.map(async (post: any) => {
        const participantCnt = await participantService.getParticipantNum(post.id);
        post.participantCnt = participantCnt;
        return post;
      })
    );
    if (result.length === 0) return res.json({ result });
    return res.json({ result, nextCursor: result[result.length - 1]['id'] });
  } catch (err: any) {
    next(ERROR.DB_READ_FAIL);
  }
};
