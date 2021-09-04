const mongoose = require("mongoose");

export const Clothing = mongoose.model("clothings", {
    product_id: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    order: {
        type: Number,
        required: true,
    },
});
