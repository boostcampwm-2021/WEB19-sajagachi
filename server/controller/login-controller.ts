import { Request, Response } from 'express';
import userService from '../service/user-service';
import { TokenType } from '../type';
import { User } from '../model/entity/User';
import jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response, next: Function) => {
  try {
    let user = await userService.findById(req.body.userId);
    if (user === undefined) user = await userService.signUp(req.body.userId);
    res.cookie('user', createToken(user));
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
    const { id } = verifyToken(req.cookies.user) as TokenType;
    if (id) {
      const user = await userService.findById(id);
      if (user) res.status(200).json(id);
      else next({ statusCode: 401, message: 'unauthorized' });
    } else next({ statusCode: 401, message: 'unauthorized' });
  } catch (err: any) {
    next({ statusCode: 401, message: err.message });
  }
};

const createToken = (user: User) => {
  const secretKey: jwt.Secret = String(process.env.JWT_SECRET);
  return jwt.sign({ id: user.id }, secretKey);
};

export const verifyToken = (token: string) => {
  const secretKey: jwt.Secret = String(process.env.JWT_SECRET);
  return jwt.verify(token, secretKey);
};
