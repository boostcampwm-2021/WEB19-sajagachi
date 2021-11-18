import { Request, Response } from 'express';
import userService from '../service/user-service';

export const getUser = async (req: Request, res: Response, next: Function) => {
  try {
    const user = await userService.findById(Number(req.params.user_id));
    res.json(user);
  } catch (err: any) {
    next({ statusCode: 500, message: err.message });
  }
};
