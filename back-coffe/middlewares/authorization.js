const adminOnly = async (req, res, next) => {
	try {
		if (req.user.role !== "admin") throw { name: "forbidden" };
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = { adminOnly };
