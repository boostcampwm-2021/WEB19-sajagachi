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

export const updatePoint = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const { user_id } = req.params;
    const user = await userService.findById(+user_id);
    if (!user) throw new Error('user not found');

    const point = +req.body.point;
    if (!point) throw new Error('invalid point');
    if (point > 0) await userService.addPoint(+user_id, point);
    else await userService.usePoint(+user_id, user.point, point);
    res.json('success');
  } catch (err: any) {
    next({ statusCode: 500, message: err.message });
  }
};
