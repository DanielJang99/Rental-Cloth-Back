const mongoose = require("mongoose");
const { extendSchema, baseSchema } = require("./baseSchema");
import { ObjectId } from "bson";

const productPriceSchema = extendSchema(baseSchema, {
    product_id: {
        type: ObjectId,
        required: true,
    },
    days: {
        type: Number,
    },
    price: {
        type: Number,
    },
    discount_percentage: {
        type: Number,
    },
});

const ProductPrice = mongoose.model("product_prices", productPriceSchema);

module.exports = ProductPrice;
