const mongoose = require("mongoose");
const { extendSchema, baseSchema } = require("./baseSchema");
const ObjectId = mongoose.Schema.Types.ObjectId;

const productPriceSchema = extendSchema(baseSchema, {
    product_id: {
        type: ObjectId,
        required: true,
    },
    day: {
        type: Number,
    },
    price: {
        type: Number,
    },
});

const ProductPrice = mongoose.model("product_prices", productPriceSchema);

module.exports = ProductPrice;
