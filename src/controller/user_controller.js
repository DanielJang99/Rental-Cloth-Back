const User = require("../models/user");

const createUser = async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        console.log("Saved user");
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (e) {
        console.log(e);
        res.status(400).send({ error: "failed to create user" });
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
        console.log(user);
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
        res.status(400).send();
    }
};

module.exports = {
    createUser,
    updateUser,
    loginUser,
};
