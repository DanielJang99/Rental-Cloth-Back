const express = require("express");
const router = new express.Router();

const {
    createProduct,
    getProducts,
    getProductById,
} = require("../controllers/product_controller");

router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);

module.exports = router;
