const express = require("express");
const router = new express.Router();

const { getStations } = require("../controllers/station_controller");

router.get("/", getStations);

module.exports = router;
