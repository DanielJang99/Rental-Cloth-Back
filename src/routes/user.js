// import createUser from "../controller/user_controller";
const createUser = require("../controller/user_controller");

const express = require("express");
const router = new express.Router();

router.post("/", createUser);

module.exports = router;
