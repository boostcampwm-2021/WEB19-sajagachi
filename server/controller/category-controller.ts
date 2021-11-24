import { Request, Response } from 'express';
import categoryService from '../service/category-service';
import ERROR from '../util/error';

export const getCategories = async (req: Request, res: Response, next: Function) => {
  try {
    const categories = await categoryService.getCategories();
    res.json(categories);
  } catch (err: any) {
    next(ERROR.DB_READ_FAIL);
  }
};
