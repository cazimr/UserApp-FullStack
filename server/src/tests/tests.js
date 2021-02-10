import chai from "chai";
import chaiHttp from "chai-http";
import app, { db } from "../index";

console.log("Hjade");
//Assertion style
chai.should();

chai.use(chaiHttp);
let firstUserToken;
let secondUserToken;
let firstUserId;
let secondUserId;

describe("Tests", () => {
	//Empty the tables if they exist
	//If not, then server will automatically create them, so they will be empty, and that's why we return "done" in that case
	//Also, if table "user_likes"  doesn't exist, then we know that "users" also didn't exist before this test
	//because we create them at the same time
	//This is all in case we haven't started the server before calling tests (or we deleted all the tables manually after starting)
	//so the tables will be created asynchronious but also the tests will be called at the same time (also async)
	//so we don't know which one will finish first

	before((done) => {
		db.query("DELETE FROM user_likes WHERE 1=1", (err) => {
			if (err) {
				if (err.code.toString() === "ER_NO_SUCH_TABLE") return done();
				throw err;
			}
			console.log("Emptied user_likes table");
			db.query("DELETE FROM users WHERE 1=1", (err) => {
				if (err) {
					if (err.code.toString() === "ER_NO_SUCH_TABLE") return done();
					else throw err;
				}
				console.log("Moze");
				done();
			});
		});
	});

	//Signup
	it("User signup should return status 201 and have an id in body", (done) => {
		chai.request(app)
			.post("/signup")
			.send({
				username: "ccazim",
				password: "ccazim",
			})
			.end((err, res) => {
				if (err) throw err;
				res.should.have.status(201);
				res.body.should.have.property("id");
				firstUserId = res.body.id;
				done();
			});
	});
	//login
	it("Registered user should be able to login and get a token in header", (done) => {
		chai.request(app)
			.post("/login")
			.send({
				username: "ccazim",
				password: "ccazim",
			})
			.end((err, res) => {
				if (err) throw err;
				res.should.have.header("auth-token");
				res.should.have.status(200);
				firstUserToken = res.header["auth-token"];
				done();
			});
	});

	//me with token
	it("Route '/me' with token from logged in user 'ccazim' should return the same username", (done) => {
		chai.request(app)
			.get("/me")
			.set("auth-token", firstUserToken)
			.end((err, res) => {
				if (err) throw err;
				res.should.have.status(200);
				res.body.should.have.property("username").eq("ccazim");
				done();
			});
	});

	// /me without token
	it("Authentication: Route '/me' shouldn't be accessible without a token", (done) => {
		chai.request(app)
			.get("/me")
			.end((err, res) => {
				if (err) throw err;
				res.should.have.status(401);
				done();
			});
	});

	//Multiple edge case
	// /me/update-password with token + /login
	it("Authentication: '/me/update-password with token, then login with the new password", (done) => {
		chai.request(app)
			.put("/me/update-password")
			.set("auth-token", firstUserToken)
			.send({ password: "password" })
			.end((err, res) => {
				if (err) throw err;
				res.should.have.status(200);
				chai.request(app)
					.post("/login")
					.send({
						username: "ccazim",
						password: "password",
					})
					.end((err, res) => {
						if (err) throw err;
						res.should.have.header("auth-token");
						res.should.have.status(200);
						firstUserToken = res.header["auth-token"];
						done();
					});
			});
	});

	// /me/update-password without token
	it("Authentication: '/me/update-password' shouldn't be accessible without token", (done) => {
		chai.request(app)
			.put("/me/update-password")
			.send({ password: "password" })
			.end((err, res) => {
				if (err) throw err;
				res.should.have.status(401);
				done();
			});
	});

	//Multiple edge case
	// /signup + /user/:id
	it("Signup a new user, then /user/:id should return his username and 0 for number of likes. Res should be json", (done) => {
		chai.request(app)
			.post("/signup")
			.send({
				username: "newUser",
				password: "pass2",
			})
			.end((err, res) => {
				if (err) throw err;
				res.should.have.status(201);
				res.body.should.have.property("id");
				secondUserId = res.body.id;
				chai.request(app)
					.get(`/user/${secondUserId}`)
					.end((err, res) => {
						if (err) throw err;
						res.should.have.status(200);
						res.should.have.header("Content-Type","application/json; charset=utf-8");
						res.body.should.have.property("username").eq("newUser");
						done();
					});
			});
	});

	//Multiple edge case
	// /login + /user/:id/like + /user/:id
	it("Second user 'likes' first user after login, then number of likes for first user should be 1. Res should be json", (done) => {
		chai.request(app)
			.post("/login")
			.send({
				username: "newUser",
				password: "pass2",
			})
			.end((err, res) => {
				if (err) throw err;
				res.should.have.status(200);
				res.should.have.header("auth-token");

				secondUserToken = res.header["auth-token"];
				chai.request(app)
					.post(`/user/${firstUserId}/like`)
					.set("auth-token", secondUserToken)
					.end((err, res) => {
						if (err) throw err;
						res.should.have.status(200);
						chai.request(app)
							.get(`/user/${firstUserId}`)
							.end((err, res) => {
								if (err) throw err;
								res.should.have.header("Content-Type","application/json; charset=utf-8");
								res.body.should.have.property("likes").eq(1);
								done();
							});
					});
			});
	});

	it("Second user shouldn't be able to like the first user again", (done) => {
		chai.request(app)
			.post("/login")
			.send({
				username: "newUser",
				password: "pass2",
			})
			.end((err, res) => {
				if (err) throw err;
				res.should.have.status(200);
				res.should.have.header("auth-token");

				secondUserToken = res.header["auth-token"];
				chai.request(app)
					.post(`/user/${firstUserId}/like`)
					.set("auth-token", secondUserToken)
					.end((err, res) => {
						if (err) throw err;
						res.should.have.status(409);
						done();
					});
			});
	});

	//Multiple edge case
	// /login + /user/:id/unlike + /user/:id
	it("Second user 'unlikes' first user after login, then number of likes for first user should be 0", (done) => {
		chai.request(app)
			.post("/login")
			.send({
				username: "newUser",
				password: "pass2",
			})
			.end((err, res) => {
				if (err) throw err;
				res.should.have.status(200);
				res.should.have.header("auth-token");

				secondUserToken = res.header["auth-token"];
				chai.request(app)
					.delete(`/user/${firstUserId}/unlike`)
					.set("auth-token", secondUserToken)
					.end((err, res) => {
						if (err) throw err;
						res.should.have.status(200);
						chai.request(app)
							.get(`/user/${firstUserId}`)
							.end((err, res) => {
								if (err) throw err;
								res.body.should.have.property("likes").eq(0);
								done();
							});
					});
			});
	});

	//Multiple edge case
	// /user/:id/like + /most-liked
	it("Second user 'likes' first user times,  most-liked should return second then first user", (done) => {
		chai.request(app)
			.post(`/user/${firstUserId}/like`)
			.set("auth-token", secondUserToken)
			.end((err, res) => {
				if (err) throw err;
				res.should.have.status(200);
				chai.request(app)
					.get(`/most-liked`)
					.end((err, res) => {
						if (err) throw err;
						res.should.have.header("Content-Type","application/json; charset=utf-8");
						res.body.should.be.a("array");
						res.body[0].username.should.be.eq('ccazim');
						res.body[0].likes.should.be.eq(1)
						res.body[1].username.should.be.eq('newUser');
						res.body[1].likes.should.be.eq(0)
						done();
					});
			});
	});
});
