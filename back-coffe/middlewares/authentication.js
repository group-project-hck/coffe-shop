const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
	try {
		const { authorization } = req.headers;
		if (!authorization) throw { name: "null_token" };

		const [type, token] = authorization.split(" ");
		if (type !== "Bearer") throw { name: "invalid_token" };

		const verify_token = verifyToken(token);
		if (!verify_token) throw { name: "invalid_token" };

		const { id } = verify_token;
		const user = await User.findByPk(id);
		if (!user) throw { name: "invalid_token" };

		req.user = user;
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = authentication;
