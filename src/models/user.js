const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { extendSchema, baseSchema } = require("./baseSchema");

const userSchema = extendSchema(baseSchema, {
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    isMarketing: {
        type: Boolean,
        required: true,
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
});

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, "rentaclothwebtoken", {
        expiresIn: "3 days",
    });
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("이메일과 비밀번호를 다시 확인해주세요.");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("이메일과 비밀번호를 다시 확인해주세요.");
    }

    return user;
};

userSchema.pre("save", async function (next) {
    const user = this;
    if (!validator.isEmail(this.email)) {
        next(new Error("올바른 이메일 형식이 아닙니다."));
    }
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

userSchema.post("save", function (error, doc, next) {
    if (error.code === 11000) {
        "email" in error.keyValue
            ? next(new Error("등록하신 이메일이 이미 존재합니다."))
            : next(new Error("등록하신 전화번호가 이미 존재합니다."));
    } else {
        next(error);
    }
});

const User = mongoose.model("users", userSchema);

module.exports = User;
