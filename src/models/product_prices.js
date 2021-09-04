const mongoose = require("mongoose");

export const ProductPrices = mongoose.model("product_prices", {
    product_id: {
        type: String,
    },
    retail_price: {
        type: Number,
    },
    discount_percentage: {
        type: Number,
    },
});
