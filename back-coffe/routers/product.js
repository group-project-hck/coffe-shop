const express = require("express");
const router = express.Router();
const Product_Controller = require("../controllers/product_controller");
const { adminOnly } = require("../middlewares/authorization");
const upload = require("../middlewares/uploader");

router.get("/", Product_Controller.findAll);
router.post("/payment/:id", Product_Controller.payment); // payment gateway
router.get("/:id", Product_Controller.findOne);

router.use(adminOnly);
router.post("/", upload.single("image"), Product_Controller.add);
router.put("/:id", upload.single("image"), Product_Controller.update);
router.delete("/:id", Product_Controller.delete);

module.exports = router;
