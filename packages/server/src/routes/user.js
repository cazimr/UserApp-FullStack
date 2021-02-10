import express from "express";
import verifyToken from "../middleware/verifyToken";

const router = express.Router();

const user = (app, db) => {
	app.use("/user", router);

	router.get("/:id", (req, res) => {
		const userId = parseInt(req.params.id);
		db.query(
			`SELECT u.username, ifnull(ulc.likes,0) "likes" from users u LEFT JOIN 
             (select user_liked,count(*) "likes" FROM user_likes GROUP BY user_liked) ulc ON u.id=ulc.user_liked 
             WHERE u.id=?`,
			[userId],
			(err, results) => {
				if (err) throw err;
                else if(results.length===0) return res.status(400).send("User doesn't exist");
                else res.json(results[0]);
                
			}
		);
	});

	router.post("/:id/like", verifyToken, (req, res) => {
		const user_liking = req.loggedUser.id;
		const user_liked = parseInt(req.params.id);
		if (user_liked === user_liking) return res.status(400).send("User cannot like himself/herself");

		//Check if user with param id exists
		db.query(`SELECT COUNT(id) "userCount" FROM users WHERE id = ?`, [user_liked], (err, results) => {
			if (err) throw err;
			else if (results.userCount === 0) return res.status(400).send(`User with id ${user_liked} doesn't exist`);
			//We don't need to check if user already liked this user because We made that combination a primary_key in user_likes
			db.query(
				`INSERT INTO user_likes(user_liking,user_liked) VALUES (?,?)`,
				[user_liking, user_liked],
				(err, results) => {
					if (err) {
						if (err.code === "ER_DUP_ENTRY") return res.status(409).send("You already made this like");
						//conflict
						else throw err;
					}
					if (results.affectedRows === 1) res.send("Like was successful");
					else res.status(500).send("Internal server error!");
				}
			);
		});
	});

	router.delete("/:id/unlike", verifyToken, (req, res) => {
		const user_liking = req.loggedUser.id;
		const user_liked = parseInt(req.params.id);
		if (user_liked === user_liking) return res.status(400).send("User cannot like/unlike himself/herself");
		db.query(`DELETE FROM user_likes WHERE user_liking=? AND user_liked=?`,[user_liking,user_liked],(err,results)=>{
			if(err) throw err;
			else if(results.affectedRows===0) return res.status(400).send("Error: No such like");
			else res.status(200).send("Unlike successful!");
			
		})
	});
};

export default user;
