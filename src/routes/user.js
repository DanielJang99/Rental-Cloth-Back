const express = require("express");
const router = new express.Router();

const user = require("../controllers/user_controller");
const auth = require("../controllers/auth_controller");

router.post("/", user.createUser);
router.patch("/:id", auth, user.updateUser);
router.post("/login", user.loginUser);
router.post("/logout", user.logoutUser);
router.post("/logoutAll", user.logoutAll);
router.get("/:id", auth, user.getUser);

module.exports = router;
