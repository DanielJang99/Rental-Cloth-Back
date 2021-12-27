const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { getFormattedDatetime } = require("../src/utils/utils");
const logger = require("../src/logs/logger");
const app = express();
const port = process.env.PORT || 7000;

app.use(express.json()); // this is to parse incoming JSON into a JavaScript object which you can access on req.body
app.use(cors());

morgan.token("date", () => {
    return getFormattedDatetime();
});

morgan.format("myformat", ":date | :method :url | :status | :response-time ms");

app.use(
    morgan("myformat", {
        // skip: function (req, res) {
        //     return res.statusCode < 400;
        // }, // http return 이 에러일때만 출력
        stream: logger.stream, // logger에서 morgan의 stream 을 받도록 추가
    }),
);

require("./models/mongoose");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const rentRouter = require("./routes/rent");
const productPricesRouter = require("./routes/product_prices");
const stationRouter = require("./routes/stations");
const alimtalkRouter = require("./routes/alimtalk");

app.listen(port, () => {
    console.log("server is up and running on port " + port);
});
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/rents", rentRouter);
app.use("/product_prices", productPricesRouter);
app.use("/stations", stationRouter);
app.use("/alimtalk", alimtalkRouter);
