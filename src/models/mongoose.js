require("dotenv").config();

const mongoose = require("mongoose");
const connectionURL = process.env.MONGOURL;
// const connectionURL =
// "mongodb://admin:admin@54.180.150.229:27017/rental_cloth?authSource=admin&authMechanism=SCRAM-SHA-1";

mongoose.connect(`${connectionURL}`, {
    useNewUrlParser: true,
});

let db = mongoose.connection;
db.on("error", function () {
    console.log("Connection Failed!");
});
db.once("open", function () {
    console.log("Connected!");
});
