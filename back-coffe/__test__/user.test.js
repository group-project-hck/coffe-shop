const app = require("../app");
const req = require("supertest");
const { User } = require("../models");

beforeAll(async () => {
	// SEEDING
	await User.bulkCreate(
		[
			{
				username: "admin",
				email: "admin@mail.com",
				role: "admin",
				password: "admin",
			},
		],
		{ individualHooks: true }
	); // perlu ada, jika pakai bulkCreate
});

// Process testing
describe("Login (Admin)", () => {
	test("Login success", async () => {
		let dummyData = {
			email: "admin@mail.com",
			password: "admin",
		};
		let res = await req(app).post("/login").send(dummyData);
		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty("access_token", res.body.access_token);
		expect(res.body).toHaveProperty("username", res.body.username);
		expect(res.body).toHaveProperty("email", res.body.email);
	});
	test("Email null", async () => {
		let dummyData = {
			password: "admin",
		};
		let res = await req(app).post("/login").send(dummyData);
		expect(res.status).toBe(400);
		expect(res.body.msg).toBe("Please insert your email");
	});
	test("Password null", async () => {
		let dummyData = {
			email: "admin@mail.com",
		};
		let res = await req(app).post("/login").send(dummyData);
		expect(res.status).toBe(400);
		expect(res.body.msg).toBe("Please insert your password");
	});
	test("Email invalid / not listed", async () => {
		let dummyData = {
			email: "staff@mail.com",
			password: "admin",
		};
		let res = await req(app).post("/login").send(dummyData);
		expect(res.status).toBe(404);
		expect(res.body.msg).toBe("Please register first");
	});
	test("Password invalid / not match", async () => {
		let dummyData = {
			email: "admin@mail.com",
			password: "staff",
		};
		let res = await req(app).post("/login").send(dummyData);
		expect(res.status).toBe(401);
		expect(res.body.msg).toBe("Email or password is wrong");
	});
});

describe("Register", () => {
	test("Register", async () => {
		let dummyData = {
			username: "user1",
			email: "user1@mail.com",
			password: "user1",
		};
		let res = await req(app).post("/register").send(dummyData);
		expect(res.status).toBe(201);
		expect(res.body.msg).toBe("Register user1's, success");
	});
	test("Email unique", async () => {
		let dummyData = {
			username: "admin",
			email: "admin@mail.com",
			password: "admin",
		};
		let res = await req(app).post("/register").send(dummyData);
		expect(res.status).toBe(400);
		expect(res.body.msg).toBe("Email already exist");
	});
	test("Register validation", async () => {
		let dummyData = {
			email: "admin@mail.com",
			password: "admin",
		};
		let res = await req(app).post("/register").send(dummyData);
		expect(res.status).toBe(400);
		expect(res.body.msg).toBe("Username is required");
	});
});

describe("Login Google", () => {
	test("Success", async () => {
		let token = {
			google_token: process.env.GOOGLE_TOKEN,
		};
		let res = await req(app).post("/google-login").send(token);
		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty("access_token", res.body.access_token);
	});
});

// RESET
afterAll(async () => {
	await User.destroy({ truncate: true, cascade: true, restartIdentity: true });
});
