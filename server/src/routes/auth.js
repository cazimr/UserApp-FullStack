import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../tools/environment";

const router = express.Router();

const auth = (app, db) => {
	app.use("/", router);

	//signup
	router.post("/signup", (req, res) => {
		if (!req.body.username || !req.body.password) return res.status(400).end("Invalid request body");

		try {
			//Test if username already exists
			db.query("SELECT id from users where username = ?", [req.body.username], async (err, result, fields) => {
				if (result.length > 0)
					return res.status(400).send(`User with username '${req.body.username}' already exists!`);

				//Hash of password + salt using bcrypt 
				const hashPw = await bcrypt.hash(req.body.password,10);
				const user = { username: req.body.username, password: hashPw };
				//Insert to database
				db.query(
					"INSERT INTO users(username,password) VALUES (?,?)",
					[user.username, user.password],
					(err, result, fields) => {
						if (err) throw err;
						res.status(201).json({id: result.insertId});
					}
				);
			});
		} catch (err) {
			res.status(500).send();
		}
	});

	router.post("/login", (req, res) => {
		if (!req.body.username || !req.body.password) return res.status(400).end("Invalid request body");

		//Test if username exists
		db.query("SELECT * FROM users WHERE username = ?", [req.body.username], async (err, results) => {
			if (results.length !== 1)
				return res.status(400).end(`User with username "${req.body.username}" doesn't exist!`);

			try {
				if (await bcrypt.compare(req.body.password, results[0].password)) {
					//JWT Token
					const token = jwt.sign({ id: results[0].id }, config.access_token_secret);

					res.header("auth-token", token).send("Successful login");
				} else res.status(400).send("Invalid password!");
			} catch (err) {
				console.log("Error", err);
				res.status(500).send(err);
			}
		});
	});
};

export default auth;
