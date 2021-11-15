import { Request } from 'express';
import { title } from 'process';
import { getDB } from '../db/db';
import { Post } from '../model/entity/Post';
import { Url } from '../model/entity/Url';
import { PostColumn, getPostsOption } from '../type';

const savePost = async (body: Request['body']): Promise<number> => {
	const db = await getDB().get();
	const postBody: any = {
		userId: Number(body.userId),
		categoryId: Number(body.categoryId),
		title: body.title,
		content: body.content,
		lat: Number(body.lat),
		long: Number(body.long)
	};
	if (!isNaN(body.capacity) && Number(body.capacity) > 0)
		postBody.capacity = Number(body.capacity);
	if (body.deadline) postBody.deadline = body.deadline;
	const newPost = db.manager.create(Post, postBody);
	const createPost = await db.manager.save(newPost);
	const { urls } = body;
	if (urls.length > 0) {
		const urlValues = urls
			.map((url: string) => `(${createPost.id}, '${url}')`)
			.join(',');
		await db.manager.query(`INSERT INTO url VALUES ${urlValues}`);
	}
	return createPost.id;
};

const getPosts = async ({
	offset,
	limit,
	category,
	finished,
	search,
	lat,
	long
}: getPostsOption) => {
	if (!(offset && limit))
		throw new Error('offset 과 limit은 지정해주어야 합니다.');
	const db = await getDB().get();
	let sql = `
	SELECT post.id, post.title, post.content, post.capacity, post.deadline, category.name as category
	FROM post
	INNER JOIN category
	ON post.categoryId = category.id
	WHERE
	post.lat BETWEEN ${lat} - 0.009094341 AND ${lat} + 0.009094341 AND
    post.long BETWEEN ${long} - 0.0112688753 AND ${long} + 0.0112688753
	`;
	const condition = [];

	if (finished !== undefined) condition.push(`post.finished = ${finished}`);
	if (search) condition.push(`post.title LIKE "%${search}%"`);

	let categories: string[] = [];
	if (category) categories = category.split(',');
	categories = categories.map(category => {
		return `post.categoryId = ${category}`;
	});
	if (categories.length !== 0)
		condition.push(' (' + categories.join(' OR ') + ') ');
	sql += condition.length ? ' AND ' + condition.join(' AND ') : '';
	sql += ' ORDER BY post.id DESC';
	sql += ` LIMIT ${offset}, ${limit}`;
	const result = await db.manager.query(sql);
	return result;
};

const getPost = async (postId: string) => {
	const db = await getDB().get();
	try {
		const post = await db.manager.findOne(Post, {
			where: { id: postId },
			relations: ['category', 'urls']
		});
		return post;
	} catch (e) {
		console.log(e);
	}
};

export default { savePost, getPosts, getPost };
