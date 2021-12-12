const Station = require("../models/station");

const getStations = async (req, res) => {
    try {
        const obj_stations = await Station.find({});
        res.status(201).send({ stations: obj_stations });
    } catch (e) {
        res.status(400).send(e);
    }
};

module.exports = { getStations };
