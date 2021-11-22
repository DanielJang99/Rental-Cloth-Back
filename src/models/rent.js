const mongoose = require("mongoose");
import { ObjectId } from "bson";
import { baseSchema, extendSchema } from "./baseSchema";

const rentSchema = extendSchema(baseSchema, {
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
    receival_station_id: {
        type: ObjectId,
        required: true,
    },
    return_station_id: {
        type: ObjectId,
        required: true,
    },
    receival_date: {
        type: String,
        required: true,
    },
    return_date: {
        type: String,
        required: true,
    },
    is_valid: {
        type: Boolean,
        required: true,
    },
    status: {
        type: String, //pending, paid, cancelled, refunded
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

const Rent = mongoose.model("rents", rentSchema);

module.exports = Rent;
