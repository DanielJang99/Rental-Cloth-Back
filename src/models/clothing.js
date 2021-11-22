import { ObjectId } from "bson";
const { extendSchema, baseSchema } = require("./baseSchema");
const mongoose = require("mongoose");

const clothingSchema = extendSchema(baseSchema, {
    product_id: {
        type: ObjectId,
        required: true,
    },
    isAvailable: {
        type: Boolean,
        required: true,
    },
    size: {
        type: String,
    },
    order: {
        type: Number,
        required: true,
    },
});

const Clothing = mongoose.model("clothings", clothingSchema);

module.exports = Clothing;
