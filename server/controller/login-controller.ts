import { Request, Response } from 'express';
import userService from '../service/user-service';
import { TokenType } from '../type';
import { User } from '../model/entity/User';
import jwt from 'jsonwebtoken';

declare module 'express-session' {
  interface SessionData {
    userId: number;
  }
}

export const login = async (req: Request, res: Response, next: Function) => {
  try {
    let user = await userService.findById(req.body.userId);
    if (user === undefined) user = await userService.signUp(req.body.userId);
    req.session.userId = user.id;
    res.status(201).json({ id: user.id, name: user.name });
  } catch (err: any) {
    next({ statusCode: 401, message: err.message });
  }
};

export const checkLogin = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const id = req.session.userId;
    if (id) {
      const user = await userService.findById(id);
      if (user) res.status(200).json({ id: user.id, name: user.name });
      else next({ statusCode: 401, message: 'unauthorized' });
    } else next({ statusCode: 401, message: 'unauthorized' });
  } catch (err: any) {
    next({ statusCode: 401, message: err.message });
  }
};
