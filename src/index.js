const express = require("express");
const userRouter = require("./routes/user");
require("./models/mongoose");

const app = express();
const port = process.env.PORT | 7000;

app.use(express.json()); // this is to parse incoming JSON into a JavaScript object which you can access on req.body
app.listen(port, () => {
    console.log("server is up and running on port " + port);
});
app.use("/users", userRouter);
