const mongoose = require("mongoose");
const { string } = require("yargs");
const { extendSchema, baseSchema } = require("./baseSchema");

const ObjectId = mongoose.Schema.Types.ObjectId;
const DateType = mongoose.Schema.Types.Date;

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
    days: {
        type: Number,
        required: true,
    },
    receival_station: {
        type: String,
        required: true,
    },
    return_station: {
        type: String,
        required: true,
    },
    start_date: {
        type: DateType,
        required: true,
    },
    end_date: {
        type: DateType,
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
    size: {
        type: String,
    },
    color: {
        type: String,
    },
});

const Rent = mongoose.model("rents", rentSchema);

module.exports = Rent;
