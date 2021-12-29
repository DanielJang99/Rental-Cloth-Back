var mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Rent = require("../models/rent");
const User = require("../models/user");
const { admins } = require("../utils/utils");

const createUser = async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
};

const updateUser = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password", "age", "phone"];

    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update),
    );

    if (!isValidOperation) {
        return res.status(400).send({
            error:
                "이름, 이메일, 전화번호, 비밀번호, 나이만 수정할 수 있습니다.",
        });
    }
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(400).send({ error: "해당 유저가 존재하지 않습니다" });
        }
        updates.forEach((update) => (user[update] = req.body[update]));
        await user.save();
        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
};

const loginUser = async (req, res) => {
    try {
        const user = await User.findByCredentials(
            req.body.email,
            req.body.password,
        );
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
};

const logoutUser = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
};

const logoutAll = async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
};

const getUser = async (req, res) => {
    try {
        const user_id = req.params.id;
        const obj_user = await User.findById(user_id);
        obj_user
            ? res.status(201).send({ user: obj_user })
            : new Error("product does not exist");
    } catch (e) {
        res.status(400).send({ error: "failed to fetch user" });
    }
};

const getUsersAndRents = async (req, res) => {
    try {
        const obj_users = await User.find({}).sort({ createdAt: -1 }).lean();
        for (const user of obj_users) {
            const user_id = user._id;
            const obj_rents = await Rent.find({ user_id: user_id });
            user["rents"] = obj_rents;
        }
        res.status(201).send(obj_users);
    } catch {
        res.status(400).send({ error: "failed to fetch users" });
    }
};

const getUserAdmin = async (req, res) => {
    const user_id = req.params.id;
    try {
        const obj_user = await User.findOne({
            isAdmin: true,
            _id: ObjectId(user_id),
        });
        res.status(201).send(obj_user);
    } catch {
        res.status(400).send({ error: "failed to fetch admins" });
    }
};

module.exports = {
    createUser,
    updateUser,
    loginUser,
    logoutUser,
    logoutAll,
    getUser,
    getUsersAndRents,
    getUserAdmin,
};
