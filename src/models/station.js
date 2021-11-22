const mongoose = require("mongoose");
const { extendSchema, baseSchema } = require("./baseSchema");

const stationSchema = extendSchema(baseSchema, {
    station_name: {
        type: String,
    },
});

const Station = mongoose.model("stations", stationSchema);

module.exports = Station;
