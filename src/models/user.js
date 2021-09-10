const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    // id: {
    //     type: String,
    //     required: true,
    // },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        },
    },
});

userSchema.pre("save", async function (next) {
    const user = this;
    console.log("hiii");
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
