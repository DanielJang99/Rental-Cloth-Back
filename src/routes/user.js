const user = require("../controller/user_controller");
const auth = require("../controller/auth_controller");

const express = require("express");
const router = new express.Router();

router.post("/", user.createUser);
router.patch("/:id", auth, user.updateUser);
router.post("/login", user.loginUser);

module.exports = router;
