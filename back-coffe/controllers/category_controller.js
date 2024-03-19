const { Category } = require("../models");

class Category_Controller {
	// PUBLIC SITE
	static async pub_findAll(req, res, next) {
		try {
			const data_category = await Category.findAll({
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
			});
			res.status(200).json(data_category);
		} catch (error) {
			next(error);
		}
	}

	// NEED AUTHENTICATION FITUR
	static async findAll(req, res, next) {
		try {
			const data_category = await Category.findAll({
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
			});
			res.status(200).json(data_category);
		} catch (error) {
			next(error);
		}
	}

	static async add(req, res, next) {
		try {
			await Category.create(req.body);
			res
				.status(201)
				.json({ msg: `Success added ${req.body.name}'s category` });
		} catch (error) {
			next(error);
		}
	}

	static async update(req, res, next) {
		try {
			const { id } = req.params;
			const data_category = await Category.findByPk(id);
			if (!data_category) throw { name: "id_not_found" };

			await data_category.update(req.body, { where: { id } });
			res
				.status(200)
				.json({ msg: `Success updated ${req.body.name}'s category` });
		} catch (error) {
			next(error);
		}
	}

	static async delete(req, res, next) {
		try {
			const { id } = req.params;
			const data_category = await Category.findByPk(id);
			if (!data_category) throw { name: "id_not_found" };

			await data_category.destroy({ where: { id } });
			res.status(200).json({ msg: `${data_category.name}, has been deleted` });
		} catch (error) {
			next(error);
		}
	}
}

module.exports = Category_Controller;
