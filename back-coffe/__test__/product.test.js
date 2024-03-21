const app = require("../app");
const req = require("supertest");
const { User, Product, Category } = require("../models");
const { signToken } = require("../helpers/jwt");

let access_token; //global token
let access_client; //global token
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
			{
				username: "client",
				email: "client@mail.com",
				role: "client",
				password: "client",
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
	access_client = signToken({ id: user[1].id });
});

// Process testing
describe("Read Products (public - Site)", () => {
	test("Read success", async () => {
		let res = await req(app).get("/pub-product");
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Object);
	});
});

describe("Create Products (Need Authen)", () => {
	// test("Adding success", async () => {
	// 	let dummyData = {
	// 		title: "tes1",
	// 		description: "tes1",
	// 		image: "../coverage/logo.png",
	// 		price: 2000,
	// 		CategoryId: 1,
	// 	};
	// 	let res = await req(app)
	// 		.post("/products")
	// 		.set("Authorization", `Bearer ${access_token}`)
	// 		.send(dummyData);
	// 	expect(res.status).toBe(201);
	// 	expect(res.body).toHaveProperty("msg", res.body.msg);
	// });
	test("Forbidden", async () => {
		let dummyData = {
			title: "tes1",
			description: "tes1",
			image: "tes1",
			price: 2000,
			CategoryId: 1,
		};
		let res = await req(app)
			.post("/products")
			.set("Authorization", `Bearer ${access_client}`)
			.send(dummyData);
		expect(res.status).toBe(403);
		expect(res.body).toHaveProperty("msg", res.body.msg);
	});
	test("Token null", async () => {
		let dummyData = {
			title: "tes1",
			description: "tes1",
			image: "tes1",
			price: 2000,
			CategoryId: 1,
		};
		let res = await req(app)
			.post("/products")
			.set("Authorization", null)
			.send(dummyData);
		expect(res.status).toBe(401);
		expect(res.body.msg).toBe("Invalid Token");
	});
	test("Validation error", async () => {
		let dummyData = {
			description: "tes1",
			image: "tes1",
			price: 2000,
			CategoryId: 1,
		};
		let res = await req(app)
			.post("/products")
			.set("Authorization", `Bearer ${access_token}`)
			.send(dummyData);
		expect(res.status).toBe(400);
		expect(res.body).toHaveProperty("msg", res.body.msg);
	});
});

describe("Buy Products (Need Authen)", () => {
	// test("Payment success", async () => {
	// 	let res = await req(app)
	// 		.post("/products/payment/1")
	// 		.set("Authorization", `Bearer ${access_token}`);
	// 	expect(res.status).toBe(201);
	// 	expect(res.body).toHaveProperty("token", res.body.token);
	// });
	test("Data not found", async () => {
		let res = await req(app)
			.post("/products/payment/20")
			.set("Authorization", `Bearer ${access_token}`);
		expect(res.status).toBe(404);
		expect(res.body).toHaveProperty("msg", res.body.msg);
	});
});

describe("Read Products (Need Authen)", () => {
	test("Read success", async () => {
		let res = await req(app)
			.get("/products")
			.set("Authorization", `Bearer ${access_token}`);
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Object);
	});
	test("Invalid token", async () => {
		let res = await req(app).get("/products").set("Authorization", null);
		expect(res.status).toBe(401);
		expect(res.body.msg).toBe("Invalid Token");
	});
	// test("Get data by params", async () => {
	// 	let res = await req(app)
	// 		.get("/products/1")
	// 		.set("Authorization", `Bearer ${access_token}`);
	// 	expect(res.status).toBe(200);
	// 	expect(res.body).toBeInstanceOf(Object);
	// });
	test("Data not found", async () => {
		let res = await req(app)
			.get("/products/20")
			.set("Authorization", `Bearer ${access_token}`);
		expect(res.status).toBe(404);
		expect(res.body.msg).toBe("Data not found");
	});
});

describe("Update Products (Need Authen)", () => {
	// test("Updated success", async () => {
	// 	let dummyData = {
	// 		title: "tes1 update",
	// 		description: "tes1 update",
	// 		image: "tes1 update",
	// 		price: 2000,
	// 		CategoryId: 1,
	// 	};
	// 	let res = await req(app)
	// 		.put("/products/1")
	// 		.set("Authorization", `Bearer ${access_token}`)
	// 		.send(dummyData);
	// 	expect(res.status).toBe(200);
	// 	expect(res.body).toHaveProperty("msg", res.body.msg);
	// });
	test("Data not found", async () => {
		let dummyData = {
			title: "tes1 update",
			description: "tes1 update",
			image: "tes1 update",
			price: 2000,
			CategoryId: 1,
		};
		let res = await req(app)
			.put("/products/20")
			.set("Authorization", `Bearer ${access_token}`)
			.send(dummyData);
		expect(res.status).toBe(404);
		expect(res.body).toHaveProperty("msg", res.body.msg);
	});
	test("Forbidden", async () => {
		let dummyData = {
			title: "tes1 update",
			description: "tes1 update",
			image: "tes1 update",
			price: 2000,
			CategoryId: 1,
		};
		let res = await req(app)
			.put("/products/1")
			.set("Authorization", `Bearer ${access_client}`)
			.send(dummyData);
		expect(res.status).toBe(403);
		expect(res.body).toHaveProperty("msg", res.body.msg);
	});
	test("Token null", async () => {
		let dummyData = {
			title: "tes1 update",
			description: "tes1 update",
			image: "tes1 update",
			price: 2000,
			CategoryId: 1,
		};
		let res = await req(app)
			.put("/products/1")
			.set("Authorization", null)
			.send(dummyData);
		expect(res.status).toBe(401);
		expect(res.body.msg).toBe("Invalid Token");
	});
});

describe("Delete Products (Need Authen)", () => {
	// test("Delete success", async () => {
	// 	let res = await req(app)
	// 		.delete("/products/1")
	// 		.set("Authorization", `Bearer ${access_token}`);
	// 	expect(res.status).toBe(200);
	// 	expect(res.body).toHaveProperty("msg", res.body.msg);
	// });
	test("Data not found", async () => {
		let res = await req(app)
			.delete("/products/20")
			.set("Authorization", `Bearer ${access_token}`);
		expect(res.status).toBe(404);
		expect(res.body).toHaveProperty("msg", res.body.msg);
	});
	test("Forbidden", async () => {
		let res = await req(app)
			.put("/products/1")
			.set("Authorization", `Bearer ${access_client}`);
		expect(res.status).toBe(403);
		expect(res.body).toHaveProperty("msg", res.body.msg);
	});
	test("Token null", async () => {
		let res = await req(app).put("/products/1").set("Authorization", null);
		expect(res.status).toBe(401);
		expect(res.body.msg).toBe("Invalid Token");
	});
});

// RESET
afterAll(async () => {
	await User.destroy({ truncate: true, cascade: true, restartIdentity: true });
	await Category.destroy({
		truncate: true,
		cascade: true,
		restartIdentity: true,
	});
});
