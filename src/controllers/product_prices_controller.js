const Product = require("../models/product");
const ProductPrice = require("../models/product_prices");

const getProductPrices = async (req, res) => {
    const product_id = req.params.product_id;
    try {
        const obj_pp = await ProductPrice.find({
            product_id: product_id,
        });
        const obj_product = await Product.findById(product_id);
        const retail_price = obj_product.retail_price;
        res.status(201).send({ prices: obj_pp, retail_price: retail_price });
    } catch (e) {
        console.error(e);
        res.status(400).send({ error: "failed to fetch product prices" });
    }
};

module.exports = {
    getProductPrices,
};
