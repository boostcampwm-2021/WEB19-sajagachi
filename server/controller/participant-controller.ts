import { Request, Response } from 'express';
import participantService from '../service/participant-service';

export const saveParticipant = async (
	req: Request,
	res: Response,
	next: Function
) => {
	try {
		const [participant, participantNum] =
			await participantService.getParticipantNum(req.body.postId);

		if (req.body.capacity !== null && participantNum > req.body.capacity)
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
