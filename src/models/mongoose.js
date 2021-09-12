const mongoose = require("mongoose");
const connectionURL = "mongodb://127.0.0.1:27017" || process.env.MONGOURL;

mongoose.connect(`${connectionURL}/rental-cloth`, {
    useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", function () {
    console.log("Connection Failed!");
});
db.once("open", function () {
    console.log("Connected!");
});
