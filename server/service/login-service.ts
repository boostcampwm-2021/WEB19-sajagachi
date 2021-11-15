import { getDB } from '../db/db';
import { User } from '../model/entity/User';
import jwt, { Jwt } from '@types/jsonwebtoken';

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
	const createUser = db.manager.save(newUser);
	return createUser;
};

const createToken = (user: User) => {
	const secretKey: jwt.Secret = String(process.env.JWT_SECRET);
	return jwt.sign(
		{
			id: user.id,
			name: user.name
		},
		secretKey,
		{
			expiresIn: `1h`
		}
	);
};

const verifyToken = (token: string) => {
	const secretKey: jwt.Secret = String(process.env.JWT_SECRET);
	return jwt.verify(token, secretKey);
};
export default { findById, signUp, createToken, verifyToken
