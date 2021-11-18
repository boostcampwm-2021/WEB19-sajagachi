import { Request, Response } from 'express';
import participantService from '../service/participant-service';
import postService from '../service/post-service';
import userService from '../service/user-service';

export const getParticipants = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const participants = await participantService.getParticipants(
      +req.params.post_id
    );
    res.json(participants);
  } catch (err: any) {
    next({ statusCode: 500, message: err.message });
  }
};

export const createParticipant = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const participantNum = await participantService.getParticipantNum(
      req.body.postId
    );
    const capacity = await postService.getCapacity(req.body.postId);

    if (capacity === undefined) throw new Error('유효하지 않은 postId 입니다.');
    if (capacity !== null && participantNum > capacity)
      throw new Error('해당 공구는 정원이 가득 찼습니다.');

    const createdParticipant = await participantService.saveParticipant(
      req.body.userId,
      req.body.postId
    );
    res.json(createdParticipant);
  } catch (err: any) {
    next({ statusCode: 500, message: err.message });
  }
};

export const getParticipantPoint = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const participant = participantService.getParticipant(
      +req.params.post_id,
      +req.params.user_id
    );
    const user = userService.findById(+req.params.user_id);
    Promise.all([participant, user]).then(result => {
      if (!result.includes(undefined)) {
        res.json({
          purchasePoint: result[0]?.point,
          leftPoint: result[1]?.point
        });
      } else next({ statusCode: 500, message: '사용자 정보 불러오기 실패' });
    });
  } catch (err: any) {
    next({ statusCode: 500, message: err.message });
  }
};
