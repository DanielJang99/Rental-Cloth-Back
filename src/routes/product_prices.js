const express = require("express");
const router = new express.Router();

const {
    getProductPrices,
} = require("../controllers/product_prices_controller");

router.get("/product/:product_id", getProductPrices);

module.exports = router;
