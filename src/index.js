const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 7000;
app.use(express.json()); // this is to parse incoming JSON into a JavaScript object which you can access on req.body
app.use(cors());

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
