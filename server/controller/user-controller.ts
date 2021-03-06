import { Request, Response } from 'express';
import userService from '../service/user-service';
import ERROR from '../util/error';

export const getUser = async (req: Request, res: Response, next: Function) => {
  try {
    const user = await userService.findById(Number(req.params.user_id));
    res.json(user);
  } catch (err: any) {
    next(ERROR.DB_READ_FAIL);
  }
};

export const updatePoint = async (req: Request, res: Response, next: Function) => {
  try {
    const { user_id } = req.params;
    const user = await userService.findById(+user_id);
    if (!user) throw new Error('user not found');

    const point = +req.body.point;
    if (!point) throw new Error('invalid point');
    if (point > 0) await userService.addPoint(+user_id, point);
    else {
      if (user.point + point < 0) throw new Error('not enough points');
      await userService.usePoint(+user_id, user.point, -point);
    }
    res.json('success');
  } catch (err: any) {
    next(ERROR.DB_WRITE_FAIL);
  }
};
