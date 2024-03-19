"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Products", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			title: {
				allowNull: false,
				type: Sequelize.STRING,
				validate: {
					notNull: true,
					notEmpty: true,
				},
			},
			description: {
				allowNull: false,
				type: Sequelize.STRING,
				validate: {
					notNull: true,
					notEmpty: true,
				},
			},
			image: {
				allowNull: false,
				type: Sequelize.STRING,
				validate: {
					notNull: true,
					notEmpty: true,
				},
			},
			price: {
				allowNull: false,
				type: Sequelize.INTEGER,
				validate: {
					notNull: true,
					notEmpty: true,
				},
			},
			UserId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				validate: {
					notNull: true,
					notEmpty: true,
				},
				references: {
					model: "Users",
					key: "id",
				},
			},
			CategoryId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				validate: {
					notNull: true,
					notEmpty: true,
				},
				references: {
					model: "Categories",
					key: "id",
				},
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Products");
	},
};
