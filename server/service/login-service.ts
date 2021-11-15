import { getDB } from '../db/db';
import { User } from '../model/entity/User';

const findById = async (id: string): Promise<User | undefined> => {
	const db = await getDB().get();
	const user = await db.manager.findOne(User, {
		where: { id: Number(id) }
	});
	return user;
};

const signUp = async (id: string): Promise<User> => {
	const db = await getDB().get();
	const newUser = db.manager.create(User, {
		id: Number(id),
		name: `horong`,
		img: `https://user-images.githubusercontent.com/53253189/141759551-188bcdf4-5ef3-481e-959b-af124fe48a33.png`
	});
	const createUser = await db.manager.save(newUser);
	return createUser;
};

export default { findById, signUp };
