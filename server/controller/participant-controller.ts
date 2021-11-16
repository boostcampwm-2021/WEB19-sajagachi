import { Request, Response } from 'express';
import participantService from '../service/participant-service';
import postService from '../service/post-service';

export const saveParticipant = async (
	req: Request,
	res: Response,
	next: Function
) => {
	try {
		const [participant, participantNum] =
			await participantService.getParticipantNum(req.body.postId);
		const capacity = await postService.getCapacity(req.body.postId);

		if (capacity === undefined)
			throw new Error('유효하지 않은 postId 입니다.');
		console.log(participantNum);
		console.log(capacity);
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
