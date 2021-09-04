const mongoose = require("mongoose");

export const Rent = mongoose.model("rents", {
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
    days: {
        type: Number,
        required: true,
    },
    receipt_station_id: {
        type: String,
        required: true,
    },
    return_station_id: {
        type: String,
        required: true,
    },
    is_valid: {
        type: Boolean,
        required: true,
    },
    receipt_date: {
        type: String,
        required: true,
    },
    return_date: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
});
