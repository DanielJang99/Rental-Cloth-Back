import { ObjectId } from "bson";
const { extendSchema, baseSchema } = require("./baseSchema");
const mongoose = require("mongoose");

const cartSchema = extendSchema(baseSchema, {
    user_id: {
        type: ObjectId,
        required: true,
    },
    product_id: {
        type: ObjectId,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    isValid: {
        type: Boolean,
        required: true,
    },
});

const Cart = mongoose.model("cart", cartSchema);

module.exports = Cart;
