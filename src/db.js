const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = process.env.MONGODB | "mongodb://127.0.0.1:27017";
const databaseName = "rental-cloth";

MongoClient.connect(
    connectionURL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error, client) => {
        if (error) {
            return console.log("unable to connect to db");
        }
    },
);
