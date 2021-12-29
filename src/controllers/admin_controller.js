const User = require("../models/user");
const jwt = require("jsonwebtoken");

const admin = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, "rentaclothwebtoken");
        console.log(token);
        console.log(decoded);
        const user = await User.findOne({
            _id: decoded._id,
            "tokens.token": token,
        }).lean();
        if (!user || !user.isAdmin) {
            throw new Error();
        }
        req.user = user;
        req.token = token;
        next();
    } catch (e) {
        res.status(401).send({ error: "Please authenticate as admin" });
    }
};

module.exports = admin;
