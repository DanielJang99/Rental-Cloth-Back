const mongoose = require("mongoose");

export const Rating = mongoose.model("ratings", {
    product_id: {
        type: String,
        required: true,
    },
    clothing_id: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    rating: {
        type: Boolean,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
});
