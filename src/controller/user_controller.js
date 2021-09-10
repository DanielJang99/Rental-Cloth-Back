const User = require("../models/user");

const createUser = async (req, res) => {
    const user = new User(req.body);
    console.log(req.body);
    try {
        await user.save();
        console.log("AFTER SAVE");
        // const token = await user.generateAuthToken();
        // res.status(201).send({ user, token });
        res.status(201).send({ user });
    } catch (e) {
        console.log(e);
        res.status(400).send({ error: "failed to create user" });
    }
};
module.exports = createUser;
// exports.updateUser = (req, res) => {
//     const updates = Object.keys(req.body);
//     const allowedUpdates = ["name", "email", "password", "age"];

//     const isValidOperation = updates.every((update) =>
//         allowedUpdates.includes(update)
//     );

//     if (!isValidOperation) {
//         return res.status(400).send({ error: "invalid updates" });
//     }
//     try {
//         updates.forEach((update) => {
//             req.user[update] = req.body[update];
//         });
//         await req.user.save();
//         res.send(req.user);
//     } catch (e) {
//         res.status(400).send(e);
//     }
// }

// exports.loginUser = (req, res) => {
//     try {
//         const user = await User.findByCredentials(
//             req.body.email,
//             req.body.password
//         );
//         const token = await user.generateAuthToken();
//         res.send({ user, token });
//     } catch (e) {
//         res.status(400).send();
//     }
// }
