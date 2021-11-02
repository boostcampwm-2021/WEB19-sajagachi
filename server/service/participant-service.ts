import { getDB } from '../db/db';
import { Participant } from '../model/entity/Participant';

export const getParticipantNum = async (postId: number) => {
	const db = await getDB().get();
	const result = await db.manager.findAndCount(Participant, {
		where: { postId }
	});
	return result;
};
