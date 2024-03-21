"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Product extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Product.belongsTo(models.User);
			Product.belongsTo(models.Category);
		}
	}
	Product.init(
		{
			title: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Title is required",
					},
					notEmpty: {
						msg: "Title is required",
					},
				},
			},
			description: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Description is required",
					},
					notEmpty: {
						msg: "Description is required",
					},
				},
			},
			image: {
				type: DataTypes.STRING,
			},
			price: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Price is required",
					},
					notEmpty: {
						msg: "Price is required",
					},
				},
				defaultValue: 10_000,
			},
			UserId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: {
						msg: "ID User is required",
					},
					notEmpty: {
						msg: "ID User is required",
					},
				},
			},
			CategoryId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: {
						msg: "ID Category is required",
					},
					notEmpty: {
						msg: "ID Category is required",
					},
				},
			},
		},
		{
			sequelize,
			modelName: "Product",
		}
	);
	return Product;
};
