const Product = require("../models/product");
const moment = require("moment");
moment().format();

const createProduct = async (req, res) => {
    const product = new Product(req.body);
    try {
        await product.save();
        res.status(201).send({ product });
    } catch (e) {
        console.log(e);
        res.status(400).send({ error: "failed to create product" });
    }
};

module.exports = {
    createProduct,
};
