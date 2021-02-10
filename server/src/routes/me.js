import express from "express";
import bcrypt from "bcrypt";
import verifyToken from "../middleware/verifyToken";

const router = express.Router();

const me = (app, db) => {
	app.use("/", router);
	
	//return id,iat(from token) and username
	router.get("/me", verifyToken, (req, res) => {
		db.query("SELECT username FROM users WHERE id = ?", [req.loggedUser.id], (err, results) => {
			if (err) throw err;
			res.json({...req.loggedUser,username: results[0].username});
		});
	});

	router.put("/me/update-password", verifyToken, async (req, res) => {
		if (!req.body.password) return res.status(400).send("Invalid request!");
		try {
			const hashPw = await bcrypt.hash(req.body.password, 10);
			db.query("UPDATE users SET password =? WHERE id=?", [hashPw, req.loggedUser.id], (err, results, fields) => {
				if (err) throw err;
				if (results.affectedRows === 1) res.send("Successful password update");
				else res.status(500).send("Server error");
			});
		}
        catch(err){
            res.status(500).send("Interval server error!");
        }
	});
};

export default me;
