require('dotenv').config();

module.exports = {
	type: 'mysql',
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DBNAME,
	synchronize: true,
	logging: true,
	entities: ['model/entity/**/*.ts'],
	migrations: ['model/migration/**/*.ts'],
	subscribers: ['model/subscriber/**/*.ts'],
	cli: {
		entitiesDir: 'model/entity',
		migrationsDir: 'model/migrations',
		subscribersDir: 'model/subscriber'
	}
};
