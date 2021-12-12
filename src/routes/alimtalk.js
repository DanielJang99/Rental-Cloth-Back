const express = require("express");
const router = new express.Router();

const { sendAlimtalk } = require("../controllers/alimtalk_controller");

router.post("/", sendAlimtalk);

module.exports = router;
