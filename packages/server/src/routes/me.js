import express from "express";
import bcrypt from "bcrypt";
import verifyToken from "../middleware/verifyToken";
import verifyPassword from "../tools/verifyPassword";

const router = express.Router();

const me = (app, db) => {
	app.use("/", router);

	//return id,iat(from token) and username
	router.get("/me", verifyToken, (req, res) => {
		db.query(
			`SELECT u.id, u.username, IFNULL(ul.likes, 0) likes FROM
		     users u LEFT JOIN (SELECT user_liked, IFNULL(COUNT(user_liked), 0) 'likes'FROM
			user_likes GROUP BY user_liked) ul ON u.id = ul.user_liked WHERE id = ?`,
			[req.loggedUser.id],
			(err, results) => {
				if (err) throw err;
				res.json(results[0]);
			}
		);
	});

	router.put("/me/update-password", verifyToken, async (req, res) => {
		if (!req.body.password) return res.status(400).send("Invalid request!");
		if (!verifyPassword(req.body.password))
			return res.status(400).send(`Password must contain a letter, a number and be at least 5 characters long`);
		try {
			const hashPw = await bcrypt.hash(req.body.password, 10);
			db.query("UPDATE users SET password =? WHERE id=?", [hashPw, req.loggedUser.id], (err, results, fields) => {
				if (err) throw err;
				if (results.affectedRows === 1) res.send("Successful password update");
				else res.status(500).send("Server error");
			});
		} catch (err) {
			res.status(500).send("Interval server error!");
		}
	});
};

export default me;
