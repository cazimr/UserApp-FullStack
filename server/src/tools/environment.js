import dotenv from "dotenv";

dotenv.config();

export default {
	port: process.env.port,
	db_host: process.env.db_host,
	db_user: process.env.db_user,
	db_password: process.env.db_password,
	db_database: process.env.db_database,
	db_port: process.env.db_port,
	access_token_secret: process.env.ACCESS_TOKEN_SECRET,
	refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
};
