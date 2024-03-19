const { comparePassword } = require("../helpers/brcypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");

// google login
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

class User_Controller {
	static async login(req, res, next) {
		try {
			const { email, password } = req.body;
			if (!email) throw { name: "require_email" };
			if (!password) throw { name: "require_password" };

			const user = await User.findOne({ where: { email } });
			if (!user) throw { name: "user_not_found" };

			const cek_password = comparePassword(password, user.password);
			if (!cek_password) throw { name: "wrong_password" };

			const access_token = signToken({ id: user.id });

			res.status(200).json({
				access_token: access_token,
				username: user.username,
				email: user.email,
			});
		} catch (error) {
			next(error);
		}
	}

	static async google_login(req, res, next) {
		try {
			const { google_token } = req.body;
			const ticket = await client.verifyIdToken({
				idToken: google_token,
				audience: process.env.CLIENT_ID,
			});
			const payload = ticket.getPayload();

			const { email, name } = payload;
			const [user, created] = await User.findOrCreate({
				where: { email },
				defaults: {
					username: name,
					email: email,
					password: Math.random().toString(),
				},
			});

			// create token
			const access_token = signToken({ id: user.id });
			res.status(200).json({
				access_token: access_token,
				username: user.username,
				email: user.email,
			});
		} catch (error) {
			next(error);
		}
	}

	static async register(req, res, next) {
		try {
			await User.create(req.body);
			res.status(201).json({ msg: `Register ${req.body.username}'s, success` });
		} catch (error) {
			next(error);
		}
	}
}

module.exports = User_Controller;
