const app = require("../app");
const req = require("supertest");
const { User, Category } = require("../models");
const { signToken } = require("../helpers/jwt");

let access_token; //global token
beforeAll(async () => {
	// SEEDING
	let user = await User.bulkCreate(
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

	await Category.bulkCreate([
		{
			name: "iced",
			name: "hot",
		},
	]);

	access_token = signToken({ id: user[0].id });
});

// Process testing
describe("Get data (public - Site)", () => {
	test("Success get data", async () => {
		let res = await req(app).get("/pub-category");
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Object);
	});
});

describe("Get data (Need Authen)", () => {
	test("Success get data", async () => {
		let res = await req(app)
			.get("/category")
			.set("Authorization", `Bearer ${access_token}`);
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Object);
	});
	test("Invalid Token", async () => {
		let res = await req(app).get("/category").set("Authorization", null);
		expect(res.status).toBe(401);
		expect(res.body.msg).toBe("Invalid Token");
	});
});

describe("Adding Category (Need Authen)", () => {
	test("Adding success", async () => {
		let dummyData = {
			name: "hot",
		};
		let res = await req(app)
			.post("/category")
			.set("Authorization", `Bearer ${access_token}`)
			.send(dummyData);
		expect(res.status).toBe(201);
		expect(res.body).toBeInstanceOf(Object);
	});
	test("Validation error", async () => {
		let dummyData = {};
		let res = await req(app)
			.post("/category")
			.set("Authorization", `Bearer ${access_token}`)
			.send(dummyData);
		expect(res.status).toBe(400);
		expect(res.body).toHaveProperty("msg", res.body.msg);
	});
	test("Token null", async () => {
		let dummyData = {
			name: "hot",
		};
		let res = await req(app)
			.post("/category")
			.set("Authorization", null)
			.send(dummyData);
		expect(res.status).toBe(401);
		expect(res.body).toHaveProperty("msg", res.body.msg);
	});
});

describe("Update Category (Need Authen)", () => {
	test("Update success", async () => {
		let dummyData = {
			name: "iced",
		};
		let res = await req(app)
			.put("/category/1")
			.set("Authorization", `Bearer ${access_token}`)
			.send(dummyData);
		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty("msg", res.body.msg);
	});
	test("Data not found", async () => {
		let dummyData = {
			name: "iced",
		};
		let res = await req(app)
			.put("/category/20")
			.set("Authorization", `Bearer ${access_token}`)
			.send(dummyData);
		expect(res.status).toBe(404);
		expect(res.body).toHaveProperty("msg", res.body.msg);
	});
	test("Token null", async () => {
		let dummyData = {
			name: "iced",
		};
		let res = await req(app)
			.put("/category/1")
			.set("Authorization", null)
			.send(dummyData);
		expect(res.status).toBe(401);
		expect(res.body).toHaveProperty("msg", res.body.msg);
	});
});

describe("Delete Category (Need Authen)", () => {
	test("Delete success", async () => {
		let res = await req(app)
			.delete("/category/2")
			.set("Authorization", `Bearer ${access_token}`);
		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty("msg", res.body.msg);
	});
	test("Data not found", async () => {
		let res = await req(app)
			.delete("/category/20")
			.set("Authorization", `Bearer ${access_token}`);
		expect(res.status).toBe(404);
		expect(res.body).toHaveProperty("msg", res.body.msg);
	});
	test("Token null", async () => {
		let res = await req(app).delete("/category/2").set("Authorization", null);
		expect(res.status).toBe(401);
		expect(res.body).toHaveProperty("msg", res.body.msg);
	});
});

// RESET
afterAll(async () => {
	await User.destroy({ truncate: true, cascade: true, restartIdentity: true });
});
