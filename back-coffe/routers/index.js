const express = require("express");
const router = express.Router();

const products = require("../routers/product");
const cateogry = require("../routers/category");
const errorHandler = require("../middlewares/error_handler");
const Product_Controller = require("../controllers/product_controller");
const User_Controller = require("../controllers/user_controller");
const authentication = require("../middlewares/authentication");
const Category_Controller = require("../controllers/category_controller");

router.get("/", (req, res) => {
	res.json("Hello World!");
});

router.post("/login", User_Controller.login);
router.post("/google-login", User_Controller.google_login);
router.post("/register", User_Controller.register);

router.get("/pub-product", Product_Controller.pub_findAll);
router.get("/pub-category", Category_Controller.pub_findAll);

// Need authentication
router.use(authentication);
router.use("/products", products);
router.use("/category", cateogry);

router.use(errorHandler);
module.exports = router;
