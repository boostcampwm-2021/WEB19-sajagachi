import { Request } from 'express';
import { getDB } from '../db/db';
import { Post } from '../model/entity/Post';
import { getPostsOption } from '../type';

const savePost = async (userId: number, body: Request['body']): Promise<number> => {
  const db = await getDB().get();
  const postBody: any = {
    userId: userId,
    categoryId: Number(body.categoryId),
    title: body.title,
    content: body.content,
    lat: Number(body.lat),
    long: Number(body.long)
  };
  if (!isNaN(body.capacity) && Number(body.capacity) > 0) postBody.capacity = Number(body.capacity);
  if (body.deadline) postBody.deadline = body.deadline;
  const newPost = db.manager.create(Post, postBody);
  const createPost = await db.manager.save(newPost);
  return createPost.id;
};

const saveUrls = async (urls: string[], postId: number): Promise<void> => {
  const db = await getDB().get();
  if (urls.length > 0) {
    const urlValues = urls.map((url: string) => `(${postId}, '${url}')`).join(',');
    await db.manager.query(`INSERT INTO url VALUES ${urlValues}`);
  }
};

const getPosts = async ({ nextCursor, limit, category, finished, search, lat, long }: getPostsOption) => {
  if (!limit) throw new Error('offset 과 limit은 지정해주어야 합니다.');
  const db = await getDB().get();
  let subSql = `
  SELECT id
  FROM post use index (idx_id_location)
  WHERE ${nextCursor ? `post.id < ${nextCursor}`: `post.id > 0`} AND
    post.lat > ${lat} - 0.009094341 AND post.lat > ${lat} + 0.009094341 AND
    post.long > ${long} - 0.0112688753 AND post.long < ${long} + 0.0112688753`;
  let sql = `
	SELECT post.id, post.title, post.content, post.capacity, post.deadline, post.finished, post.lat, post.long, category.name as category
	FROM (${subSql}) AS filtered_post
  LEFT JOIN post
  ON filtered_post.id = post.id
	LEFT JOIN category
	ON post.categoryId = category.id`;
  const condition = [];

  if (finished !== undefined) {
    let option = ` (post.finished = 1 OR (post.deadline IS NOT NULL AND post.deadline <= now())) `;
    if (String(finished) === 'false') option = ' NOT' + option;
    condition.push(option);
  }

  if (search) condition.push(`post.title LIKE "%${search}%"`);

  let categories: string[] = [];
  if (category) categories = category.split(',');
  categories = categories.map(category => {
    return `post.categoryId = ${category}`;
  });
  if (categories.length !== 0) condition.push(' (' + categories.join(' OR ') + ') ');
  sql += condition.length ? ' WHERE ' + condition.join(' AND ') : '';
  sql += ` LIMIT ${limit}`;
  const result = await db.manager.query(sql);
  return result;
};

const getPost = async (postId: string) => {
  const db = await getDB().get();
  const post = await db.manager.findOne(Post, {
    where: { id: postId },
    relations: ['category', 'urls', 'user']
  });
  return post;
};

const updatePostFinished = async (postId: number) => {
  const db = await getDB().get();
  const updatedPost = await db.manager.update(Post, postId, {
    finished: true
  });
  return updatedPost;
};

const getCapacity = async (postId: number) => {
  const db = await getDB().get();
  const capacity = await db.manager.findOne(Post, { where: { id: postId } });
  return capacity?.capacity;
};

const getHost = async (postId: number) => {
  const db = await getDB().get();
  const result = await db.manager.findOne(Post, {
    select: ['userId'],
    where: { id: postId }
  });
  if (!result) throw new Error('post not found');
  return result.userId;
};

const getFinished = async (postId: number) => {
  const db = await getDB().get();
  const finished = await db.manager.find(Post, {
    select: ['finished'],
    where: { id: postId }
  });
  return finished[0];
};

const getTitle = async (postId: number) => {
  const db = await getDB().get();
  const result = await db.manager.findOne(Post, {
    select: ['title'],
    where: { id: postId }
  });
  if (result === undefined) throw new Error('post not found');
  return result.title;
};

export default {
  savePost,
  getPosts,
  getPost,
  updatePostFinished,
  getCapacity,
  saveUrls,
  getHost,
  getFinished,
  getTitle
};
