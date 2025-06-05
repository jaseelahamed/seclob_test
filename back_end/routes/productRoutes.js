const express = require("express");
const router = express.Router();
const { validate } = require("../controllers/productController");

const { isAdmin } = require("../middleware/authMiddleware");

const productController = require("../controllers/productController");

router.get("/", productController.getProducts);
router.post("/", ...validate, productController.createProduct);

module.exports = router;