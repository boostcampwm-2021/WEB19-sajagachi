import { Request, Response } from 'express';
import postService from '../service/post-service';
import participantService from '../service/participant-service';
import { getPostsOption } from '../type';
import ERROR from '../util/error';
import { getDB } from '../db/db';

export const getPosts = async (req: Request, res: Response, next: Function) => {
  try {
    const posts = await postService.getPosts(req.query as getPostsOption);
    const result: any = await Promise.all(
      posts.map(async (post: any) => {
        const participantCnt = await participantService.getParticipantNum(post.id);
        post.participantCnt = participantCnt;
        return post;
      })
    );
    if (result.length === 0) return res.json({ result });
    return res.json({ result, nextCursor: result[result.length - 1]['id'] });
  } catch (err: any) {
    next(ERROR.DB_READ_FAIL);
  }
};

export const getPost = async (req: Request, res: Response, next: Function) => {
  try {
    const post = await postService.getPost(req.params.postId);
    const userId = req.session.userId;
    let isParticipate: boolean;
    if (userId === undefined) isParticipate = false;
    else {
      isParticipate = await participantService.checkParticipation(Number(req.params.postId), userId);
    }

    const participantCnt = await participantService.getParticipantNum(Number(req.params.postId));
    res.json({ ...post, participantCnt, isParticipate });
  } catch (err: any) {
    next(ERROR.DB_READ_FAIL);
  }
};

export const savePost = async (req: Request, res: Response, next: Function) => {
  const queryRunner = (await getDB().get()).createQueryRunner();
  await queryRunner.startTransaction();
  try {
    if (req.session.userId === undefined) next(ERROR.NOT_LOGGED_IN);
    const postId = await postService.savePost(Number(req.session.userId), req.body);
    await postService.saveUrls(req.body.urls, postId);
    await participantService.saveParticipant(Number(req.session.userId), postId);
    await queryRunner.commitTransaction();
    res.json(postId);
  } catch (err: any) {
    await queryRunner.rollbackTransaction();
    next(ERROR.DB_WRITE_FAIL);
  } finally {
    await queryRunner.release();
  }
};

export const getHost = async (req: Request, res: Response, next: Function) => {
  try {
    const { postId } = req.params;
    const userId = await postService.getHost(+postId);
    res.json(userId);
  } catch (err: any) {
    next(ERROR.DB_READ_FAIL);
  }
};

export const getPostFinished = async (req: Request, res: Response, next: Function) => {
  try {
    const { postId } = req.params;
    const finished = await postService.getFinished(+postId);
    res.json(finished);
  } catch (err: any) {
    next(ERROR.DB_READ_FAIL);
  }
};

export const finishPost = async (req: Request, res: Response, next: Function) => {
  try {
    const { postId } = req.params;
    await postService.updatePostFinished(+postId);
    res.status(200).send();
  } catch (err: any) {
    next(ERROR.DB_WRITE_FAIL);
  }
};

export const getTitle = async (req: Request, res: Response, next: Function) => {
  try {
    const { postId } = req.params;
    const title = await postService.getTitle(+postId);
    res.json(title);
  } catch (err: any) {
    next(ERROR.DB_READ_FAIL);
  }
};
