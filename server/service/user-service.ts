import { Db } from 'typeorm';
import { getDB } from '../db/db';
import { User } from '../model/entity/User';

const findById = async (id: number): Promise<User | undefined> => {
	const db = await getDB().get();
	const user = await db.manager.findOne(User, {
		where: { id: id }
	});
	return user;
};

const signUp = async (id: number): Promise<User> => {
	const db = await getDB().get();
	const newUser = db.manager.create(User, {
		id: id,
		name: `horong`,
		img: `https://user-images.githubusercontent.com/53253189/141759551-188bcdf4-5ef3-481e-959b-af124fe48a33.png`
	});
	const createUser = await db.manager.save(newUser);
	return createUser;
};

const usePoint = async (id: number, point: number, sendPoint: number) => {
	const db = await getDB().get();
	const result = await db.manager.update(User, id, {
		point: point - sendPoint
	});
	return result;
};

const addPoint = async (id: number, point: number) => {
	const db = await getDB().get();
	const result = await db
		.createQueryBuilder()
		.update(User)
		.set({
			point: () => `point + ${point}`
		})
		.where('id = :id', { id: id })
		.execute();
	return result;
};

export default { findById, signUp, usePoint, addPoint };
