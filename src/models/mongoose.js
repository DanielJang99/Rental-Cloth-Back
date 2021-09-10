const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/rental-cloth", {
    useNewUrlParser: true,
});

const db = mongoose.connection;
// 4. 연결 실패
db.on("error", function () {
    console.log("Connection Failed!");
});
// 5. 연결 성공
db.once("open", function () {
    console.log("Connected!");
});
