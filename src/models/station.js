const mongoose = require("mongoose");
const { extendSchema, baseSchema } = require("./baseSchema");

const stationSchema = extendSchema(baseSchema, {
    name: {
        type: String,
        required: true,
    },
    isValid: {
        type: Boolean,
    },
});

const Station = mongoose.model("stations", stationSchema);

module.exports = Station;
