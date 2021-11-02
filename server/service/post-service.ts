import { getDB } from '../db/db';
import { Post } from '../model/entity/Post';

export const savePost = async () => {
	const db = await getDB().get();
	const newPost = db.manager.create(Post, { title: 'hello world' });
	return await db.manager.save(newPost);
};

// 타입지정해주기
// 쿼리 관련해서

type getPostsOption = {
	offset: number | undefined;
	limit: number | undefined;
	category: number | undefined;
	finished: boolean | undefined;
	search: string | undefined;
};
// join, offset
export const getPosts = async ({
	offset,
	limit,
	category,
	finished,
	search
}: getPostsOption) => {
	const db = await getDB().get();
	// join category, participant
	// WHERE user_space.userId LIKE '${userId}';
	let sql = `
	SELECT post.id, post.title, post.capacity, post.deadline, category.name
	FROM post
	INNER JOIN category
	ON post.categoryId = category.id 
	`;

	const condition = [];
	if (finished) condition.push(`post.finished = ${finished}`);
	if (search) condition.push(`post.title LIKE "%${search}%"`);
	if (category) condition.push(`post.categoryId = ${category}`);
	sql += condition.length ? 'WHERE ' + condition.join(' AND ') : '';

	console.log(sql);
	const result = await db.manager.query(sql);
	console.log(result);
};
