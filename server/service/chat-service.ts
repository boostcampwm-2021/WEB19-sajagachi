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
		const result = db.manager.save(newChat);
	} catch (e) {
		console.log(e);
	}
};

export default { saveChat };
