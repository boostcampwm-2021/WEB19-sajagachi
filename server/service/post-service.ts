import { Request } from 'express';
import { getDB } from '../db/db';
import { Post } from '../model/entity/Post';
import { Url } from '../model/entity/Url';
import { PostColumn, getPostsOption } from '../type';

const savePost = async (body: Request['body']): Promise<void> => {
	const db = await getDB().get();
	const postBody: PostColumn = body;
	const newPost = db.manager.create(Post, postBody);
	const { id } = await db.manager.save(newPost);
	const { urls } = body;
	const urlValues = urls.map((url: string) => `(${id}, ${url})`).join(',');
	await db.manager.query(`INSERT INTO url VALUES ${urlValues}`);
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
	SELECT post.id, post.title, post.capacity, post.deadline, category.name as category, (6371*acos(cos(radians(${lat}))*cos(radians(post.lat))*cos(radians(post.long)-radians(${long}))+sin(radians(${lat}))*sin(radians(post.lat)))) AS distance
	FROM post
	INNER JOIN category
	ON post.categoryId = category.id
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

	sql += condition.length ? 'WHERE ' + condition.join(' AND ') : '';
	sql += `HAVING distance <= 1`;
	sql += ' ORDER BY post.id DESC';
	sql += ` LIMIT ${offset}, ${limit}`;
	const result = await db.manager.query(sql);
	return result;
};

const getPost = async (postId: string) => {
	const db = await getDB().get();
	const post = await db.manager.findOne(Post, {
		where: { id: postId },
		relations: ['category']
	});
	return post;
};

export default { savePost, getPosts, getPost };
