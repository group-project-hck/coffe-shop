const { Op } = require("sequelize");
const { Product, Category } = require("../models");
const midtransClient = require("midtrans-client");

// SDK initialization
const ImageKit = require("imagekit");
let imagekit = new ImageKit({
	publicKey: process.env.IMG_PUBLIC_KEY,
	privateKey: process.env.IMG_PRIVATE_KEY,
	urlEndpoint: process.env.IMG_URL_ENDPOINT,
});

class Product_Controller {
	// PUBLIC SITE
	static async pub_findAll(req, res, next) {
		try {
			let { q } = req.query;
			let option = {
				include: {
					model: Category,
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				},
				where: { price: { [Op.gt]: 1000 } },
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
			};
			if (q) option.where.title = { [Op.iLike]: `%${q}%` };
			const data_products = await Product.findAll(option);
			res.status(200).json(data_products);
		} catch (error) {
			next(error);
		}
	}

	// NEED AUTHENTICATION FITUR
	static async findAll(req, res, next) {
		try {
			let { q } = req.query;
			let option = {
				include: {
					model: Category,
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				},
				where: { price: { [Op.gt]: 1000 } },
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
			};
			if (q) option.where.title = { [Op.iLike]: `%${q}%` };
			const data_products = await Product.findAll(option);
			res.status(200).json(data_products);
		} catch (error) {
			next(error);
		}
	}

	static async findOne(req, res, next) {
		try {
			const { id } = req.params;
			const data_products = await Product.findByPk(id);
			if (!data_products) throw { name: "id_not_found" };

			res.status(200).json(data_products);
		} catch (error) {
			next(error);
		}
	}

	static async add(req, res, next) {
		try {
			req.body.UserId = req.user.id;
			let { file } = req;
			if (!file) throw { name: "file_empty" };
			let base64Img = file.buffer.toString("base64"); // format base64
			let imageUrl = `data:${file.mimetype};base64,${base64Img}`; // format Data URL

			const upload = await imagekit.upload({
				file: imageUrl, //required
				fileName: "my_file_name.jpg", //required
				extensions: [
					{
						name: "google-auto-tagging",
						maxTags: 5,
						minConfidence: 95,
					},
				],
			});
			req.body.image = upload.url;
			await Product.create(req.body);
			res
				.status(201)
				.json({ msg: `Success added ${req.body.title}'s product` });
		} catch (error) {
			next(error);
		}
	}

	static async update(req, res, next) {
		try {
			const { id } = req.params;
			const data_products = await Product.findByPk(id);
			if (!data_products) throw { name: "id_not_found" };

			let { file } = req;
			if (!file) throw { name: "file_empty" };
			let base64Img = file.buffer.toString("base64"); // format base64
			let imageUrl = `data:${file.mimetype};base64,${base64Img}`; // format Data URL

			const upload = await imagekit.upload({
				file: imageUrl, //required
				fileName: "my_file_name.jpg", //required
				extensions: [
					{
						name: "google-auto-tagging",
						maxTags: 5,
						minConfidence: 95,
					},
				],
			});
			req.body.image = upload.url;
			await data_products.update(req.body, { where: { id } });
			res
				.status(200)
				.json({ msg: `Success updated ${req.body.title}'s product` });
		} catch (error) {
			next(error);
		}
	}

	static async delete(req, res, next) {
		try {
			const { id } = req.params;
			const data_products = await Product.findByPk(id);
			if (!data_products) throw { name: "id_not_found" };

			await data_products.destroy({ where: { id } });
			res.status(200).json({ msg: `${data_products.title}, has been deleted` });
		} catch (error) {
			next(error);
		}
	}

	static async payment(req, res, next) {
		try {
			const { id } = req.params;
			const order = await Product.findByPk(id);
			if (!order) throw { name: "id_not_found" };

			let snap = new midtransClient.Snap({
				isProduction: false,
				serverKey: process.env.SERVER_KEY,
			});

			let parameter = {
				transaction_details: {
					order_id:
						"TRANSACTION-" + Math.floor(order.price + Math.random() * 90_000),
					gross_amount: order.price,
				},
				credit_card: {
					secure: true,
				},
				customer_details: {
					username: req.user.username,
					email: req.user.email,
				},
			};
			const midtrans_token = await snap.createTransaction(parameter);
			res.status(201).json(midtrans_token);
		} catch (error) {
			next(error);
		}
	}
}

module.exports = Product_Controller;
