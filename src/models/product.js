const mongoose = require("mongoose");
const { extendSchema, baseSchema } = require("./baseSchema");

const productSchema = extendSchema(baseSchema, {
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
    },
    quantity: {
        type: Number,
        required: true,
    },
    isAvailable: {
        type: Boolean,
        required: true,
    },
    avg_rating: {
        type: Number,
    },
    ratings_quantity: {
        type: Number,
    },
    daily_price: {
        // 랜딩에 보여질 가격
        type: Number,
    },
    retail_price: {
        // 랜딩에 보여질 가격
        type: Number,
    },
    image_urls : [String], 
});

productSchema.statics.checkAvailability = async (product_id) => {
    const product = await Product.findOne({
        product_id: product_id,
    });
    return product.isAvailable ? true : false;
};

const Product = mongoose.model("products", productSchema);

module.exports = Product;
