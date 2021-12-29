const express = require("express");
const router = new express.Router();

const user = require("../controllers/user_controller");
const auth = require("../controllers/auth_controller");
const admin = require("../controllers/admin_controller");

router.post("/", user.createUser);
router.post("/login", user.loginUser);
router.post("/logout", user.logoutUser);
router.post("/logoutAll", user.logoutAll);
router.get("/rents", admin, user.getUsersAndRents);
router.get("/admin/:id", user.getUserAdmin);
router.get("/:id", user.getUser);
router.patch("/:id", auth, user.updateUser);

module.exports = router;
