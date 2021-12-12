const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

export const Rating = mongoose.model("ratings", {
    product_id: {
        type: ObjectId,
        required: true,
    },
    clothing_id: {
        type: ObjectId,
        required: true,
    },
    user_id: {
        type: ObjectId,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    review: {
        type: String,
        required: false,
    },
});
