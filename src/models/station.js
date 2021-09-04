const mongoose = require("mongoose");

const Station = mongoose.model("stations", {
    station_name: {
        type: String,
    },
});
