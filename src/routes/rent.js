const express = require("express");
const router = new express.Router();

const auth = require("../controllers/auth_controller");

const {
    createRent,
    cancelRent,
    getUserRents,
    updateRent,
    getUserRentByProduct,
} = require("../controllers/rent_controller");

router.post("/", createRent);
router.post("/cancel", cancelRent);
router.get("/user/:user_id", getUserRents);
router.post("/:_id", updateRent);
router.get("/user/:user_id/product/:product_id", getUserRentByProduct);

module.exports = router;
