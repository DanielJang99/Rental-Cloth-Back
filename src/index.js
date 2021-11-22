const moment = require("moment");
moment().format();

const express = require("express");
const app = express();
const port = process.env.PORT || 7000;
app.use(express.json()); // this is to parse incoming JSON into a JavaScript object which you can access on req.body

require("./models/mongoose");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");

app.listen(port, () => {
    console.log("server is up and running on port " + port);
});
app.use("/users", userRouter);
app.use("/products", productRouter);
