import { getDB } from '../db/db';
import { Post } from '../model/entity/Post';
import { getPostsOption } from '../type';
const savePost = async () => {
	const db = await getDB().get();
	const newPost = db.manager.create(Post, { title: 'hello world' });
	return await db.manager.save(newPost);
};

const getPosts = async ({
	offset,
	limit,
	category,
	finished,
	search
}: getPostsOption) => {
	if (!(offset && limit))
		throw new Error('offset 과 limit은 지정해주어야 합니다.');

	const db = await getDB().get();
	let sql = `
	SELECT post.id, post.title, post.capacity, post.deadline, category.name as category
	FROM post
	INNER JOIN category
	ON post.categoryId = category.id 
	`;

	const condition = [];
	if (finished) condition.push(`post.finished = ${finished}`);
	if (search) condition.push(`post.title LIKE "%${search}%"`);
	if (category) condition.push(`post.categoryId = ${category}`);
	sql += condition.length ? 'WHERE ' + condition.join(' AND ') : '';
	sql += ' ORDER BY post.id DESC';
	sql += ` LIMIT ${offset}, ${limit}`;

	const result = await db.manager.query(sql);
	return result;
};

export default { savePost, getPosts };
