import mysql from 'mysql';
import config from '../tools/environment';
import {createTables} from './tablesInit';
import logger from '../tools/logger';


const dbInit = ()=>{
	let db = mysql.createConnection({
		host: config.db_host,
		user: config.db_user,
		password: config.db_password,
		database: config.db_database,
		port: config.db_port,
	});

	db.connect((err) => {
		if (err) throw err;
		else {
			logger.info(`Connected to balkon_db with id: ${db.threadId}`);
			createTables(db);
		}
	});
	return db;
}


export default dbInit;