import { Request, Response } from 'express';
import participantService from '../service/participant-service';
import postService from '../service/post-service';
import { SYSTEM_MSG_TYPE, processSystemMsg } from '../socket/chat';

export const getParticipants = async (req: Request, res: Response, next: Function) => {
  try {
    const participants = await participantService.getParticipants(+req.params.post_id);
    res.json(participants);
  } catch (err: any) {
    next({ statusCode: 500, message: err.message });
  }
};

export const createParticipant = async (req: Request, res: Response, next: Function) => {
  try {
    const participantNum = await participantService.getParticipantNum(req.body.postId);
    const capacity = await postService.getCapacity(req.body.postId);

    if (capacity === undefined) throw new Error('유효하지 않은 postId 입니다.');
    if (capacity !== null && participantNum > capacity) throw new Error('해당 공구는 정원이 가득 찼습니다.');

    const createdParticipant = await participantService.saveParticipant(req.body.userId, req.body.postId);
    processSystemMsg(req.app.get('io'), SYSTEM_MSG_TYPE.JOIN, req.body.postId, String(req.session.userName));
    res.json(createdParticipant);
  } catch (err: any) {
    next({ statusCode: 500, message: err.message });
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
    next({ statusCode: 500, message: err.message });
  }
};
