import { Request, Response } from 'express';
import postService from '../service/post-service';
import participantService from '../service/participant-service';
import { getPostsOption } from '../type';

export const getPosts = async (req: Request, res: Response, next: Function) => {
	try {
		const posts = await postService.getPosts(req.query as getPostsOption);
		const result = await Promise.all(
			posts.map(async (post: any) => {
				const participantCnt =
					await participantService.getParticipantNum(post.id);
				post.participantCnt = participantCnt;
				return post;
			})
		);
		res.json(result);
	} catch (err: any) {
		next({ statusCode: 500, message: err.message });
	}
};

export const getPost = async (req: Request, res: Response, next: Function) => {
	try {
		const post = await postService.getPost(req.params.postId);
		const participantCnt = await participantService.getParticipantNum(
			Number(req.params.postId)
		);
		res.json({ ...post, participantCnt });
	} catch (err: any) {
		next({ statusCode: 500, message: err.message });
	}
};

export const savePost = async (req: Request, res: Response, next: Function) => {
	try {
		const postId = await postService.savePost(req.body);
		res.json(postId);
	} catch (err: any) {
		next({ statusCode: 500, message: err.message });
	}
};
