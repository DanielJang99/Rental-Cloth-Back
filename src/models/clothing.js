const mongoose = require("mongoose");
const { extendSchema, baseSchema } = require("./baseSchema");
const ObjectId = mongoose.Schema.Types.ObjectId;

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
