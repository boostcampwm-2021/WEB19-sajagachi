import { getDB } from '../db/db';
import { Post } from '../model/entity/Post';

export const savePost = async () => {
	const db = await getDB().get();
	const newPost = db.manager.create(Post, { title: 'hello world' });
	return await db.manager.save(newPost);
};
