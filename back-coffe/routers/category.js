const express = require("express");
const router = express.Router();
const { adminOnly } = require("../middlewares/authorization");
const Category_Controller = require("../controllers/category_controller");

router.get("/", Category_Controller.findAll);

router.use(adminOnly);
router.post("/", Category_Controller.add);
router.put("/:id", Category_Controller.update);
router.delete("/:id", Category_Controller.delete);

module.exports = router;
