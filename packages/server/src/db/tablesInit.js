import logger from "../tools/logger";


export const createTables = (db)=>{
	createUsers(db).then(result=>{
		if (result.warningCount === 0) logger.info(`Table 'users' successfully created`);
		createUserLikes(db).then(result=>{
			if (result.warningCount === 0) logger.info(`Table 'user_likes' successfully created`)
		}).catch(err=>{
			console.log("Error creatin table user_likes!",err);
			throw err;
		})
	}).catch(err=>{
		console.log("Error creating table users!",err);
		throw err;
	})
}

const createUsers =(db) => {
	return new Promise((resolve,reject)=>{
		db.query(
			`CREATE TABLE IF NOT EXISTS users(
			id INT NOT NULL AUTO_INCREMENT,
			username VARCHAR(50) NOT NULL UNIQUE,
			password VARCHAR(255) NOT NULL,
			PRIMARY KEY (id));`,
			(err, result) => {
				if (err) reject(err);
				else resolve(result)
			}
		);
	})
	
};

const createUserLikes = (db)=>{
	return new Promise((resolve,reject)=>{
		db.query(
			`CREATE TABLE IF NOT EXISTS user_likes(
			user_liking INT NOT NULL,
			user_liked INT NOT NULL,
			PRIMARY KEY (user_liking, user_liked),
			INDEX user_liked_fk_idx (user_liked ASC) INVISIBLE,
			CONSTRAINT user_liking_fk
			  FOREIGN KEY (user_liking)
			  REFERENCES users(id)
			  ON DELETE NO ACTION
			  ON UPDATE NO ACTION,
			CONSTRAINT user_liked_fk
			  FOREIGN KEY (user_liked)
			  REFERENCES users(id)
			  ON DELETE NO ACTION
			  ON UPDATE NO ACTION);
		  `,
			(err, result) => {
				if (err) reject(err);
				else resolve(result);
			}
		);
	})
}
