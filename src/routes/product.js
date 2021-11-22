const product = require("../controller/product_controller");
const express = require("express");
const router = new express.Router();

router.post("/", product.createProduct);

module.exports = router;
