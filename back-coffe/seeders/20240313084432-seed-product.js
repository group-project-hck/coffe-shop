"use strict";

const axios = require("axios");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		let { data } = await axios.get("https://api.sampleapis.com/coffee/hot");
		let products = data.map((product) => {
			product.createdAt = product.updatedAt = new Date();
			product.UserId = product.CategoryId = 1;
			product.price = 10_000;
			let {
				title,
				description,
				image,
				createdAt,
				updatedAt,
				UserId,
				CategoryId,
				price,
			} = product;
			return {
				title,
				description,
				image,
				createdAt,
				updatedAt,
				UserId,
				CategoryId,
				price,
			};
		});
		await queryInterface.bulkInsert("Products", products);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete("Products", null, {});
	},
};
