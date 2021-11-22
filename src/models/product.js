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
        type: Number,
    },
    retail_price: {
        type: Number,
    },
});

const Product = mongoose.model("products", productSchema);

module.exports = Product;
