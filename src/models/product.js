const mongoose = require("mongoose");

export const Product = mongoose.model("products", {
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    total_quantity: {
        type: Number,
        required: true,
    },
    brand: {
        type: String,
    },
    likes: {
        type: Number,
    },
});
