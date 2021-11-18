import { Request, Response } from 'express';
import categoryService from '../service/category-service';

export const getCategories = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const categories = await categoryService.getCategories();
    res.json(categories);
  } catch (err: any) {
    next({ statusCode: 500, message: err.message });
  }
};
