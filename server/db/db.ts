import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';

const connectDB = async () => {
	const connection = await createConnection();
	console.log('Database Connected :)');
	return connection;
};

let instance: Connection;
export const getDB = () => {
	const get = async () => {
		if (!instance) instance = await connectDB();
		return instance;
	};
	return {
		get
	};
};
