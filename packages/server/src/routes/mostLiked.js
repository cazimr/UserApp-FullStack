import express from "express";
import bcrypt from "bcrypt";
import verifyToken from "../middleware/verifyToken";

const router = express.Router();

const mostLiked = (app, db) => {
	app.use("/", router);

	router.get("/most-liked", (req, res) => {
		db.query(`SELECT u.username, IFNULL(ulc.likes, 0) "likes"
                  FROM users u LEFT JOIN
                  (SELECT user_liked, COUNT(*) 'likes' FROM user_likes GROUP BY user_liked) ulc ON u.id = ulc.user_liked
                  ORDER BY likes DESC,username ASC`, (err, results) => {
			if (err) throw err;
			res.json(results);
		});
	});
};

export default mostLiked;
