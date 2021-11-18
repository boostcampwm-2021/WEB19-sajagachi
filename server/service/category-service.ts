import { getDB } from '../db/db';
import { Category } from '../model/entity/Category';
const getCategories = async () => {
  const db = await getDB().get();
  const result = await db.manager.find(Category);
  return result;
};

export default { getCategories };
