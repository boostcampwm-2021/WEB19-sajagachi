import { getDB } from '../db/db';
import { Participant } from '../model/entity/Participant';

const getParticipantNum = async (postId: number) => {
	const db = await getDB().get();
	const result = await db.manager.findAndCount(Participant, {
		where: { postId }
	});
	return result;
};

const saveParticipant = async (userId: number, postId: number) => {
	const db = await getDB().get();

	const newParticipant = db.manager.create(Participant, {
		userId,
		postId,
		point: 0
	});
	const createdParticipant = await db.manager.save(newParticipant);

	return createdParticipant;
};

export default { getParticipantNum, saveParticipant };
