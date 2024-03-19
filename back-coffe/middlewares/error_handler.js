const errorHandler = (err, req, res, next) => {
	switch (err.name) {
		case "SequelizeValidationError":
			res.status(400).json({ msg: err.errors[0].message });
			break;
		case "SequelizeUniqueConstraintError":
			res.status(400).json({ msg: "Email already exist" });
			break;
		case "file_empty":
			res.status(400).json({ msg: "Please insert your file" });
			break;
		case "require_email":
			res.status(400).json({ msg: "Please insert your email" });
			break;
		case "require_password":
			res.status(400).json({ msg: "Please insert your password" });
			break;
		case "wrong_password":
			res.status(401).json({ msg: "Email or password is wrong" });
			break;
		case "null_token":
			res.status(401).json({ msg: "Please login first" });
			break;
		case "invalid_token":
		case "JsonWebTokenError":
			res.status(401).json({ msg: "Invalid Token" });
			break;
		case "forbidden":
			res.status(403).json({ msg: "Forbidden, cannot access" });
			break;
		case "user_not_found":
			res.status(404).json({ msg: "Please register first" });
			break;
		case "id_not_found":
			res.status(404).json({ msg: "Data not found" });
			break;
		default:
			res.status(500).json({ msg: "Internal server error" });
			break;
	}
};

module.exports = errorHandler;
