var mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Rent = require("../models/rent");
const Product = require("../models/product");

const {
    processRent,
    processRentCancellation,
} = require("../services/rent_service");

const createRent = async (req, res) => {
    const obj_rent = await processRent(req.body);
    const { error } = obj_rent;
    console.error(error);
    return error
        ? res.status(400).send({ error })
        : res.status(201).send(obj_rent);
};

const cancelRent = async (req, res) => {
    const cancel = await processRentCancellation(req.body.rent_id);
    return cancel
        ? res.status(201).send()
        : res.status(400).send({
              error: "취소에 실패했습니다. 다시 시도해주세요.",
          });
};

const getUserRents = async (req, res) => {
    const user_id = req.params.user_id;
    try {
        const user_rents = await Rent.find({ user_id: ObjectId(user_id) });
        res.status(201).send(user_rents);
    } catch (e) {
        console.error(e);
        res.status(400).send({
            error: "주문 내역을 불러오는데 실패했습니다. 다시 시도해주세요.",
        });
    }
};

const getUserRentByProduct = async (req, res) => {
    const user_id = req.params.user_id;
    const product_id = req.params.product_id;
    try {
        const obj_product = await Product.findById(product_id);
        const { name } = obj_product;
        const obj_rent = await Rent.findOne({
            user_id: ObjectId(user_id),
            product_id: ObjectId(product_id),
        }).sort({ createdAt: -1 });
        res.status(201).send({ rent: obj_rent, name });
    } catch (e) {
        console.error(e);
        res.status(400).send({
            error: "주문 내역을 불러오는데 실패했습니다. 다시 시도해주세요.",
        });
    }
};

const updateRent = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
        "receival_station_id",
        "return_station_id",
        "days",
        "start_date",
        "end_date",
        "price",
    ];
    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update),
    );
    if (!isValidOperation) {
        return res.status(400).send({
            error: "수정에 실패했습니다. 다시 시도해주세요",
        });
    }
    try {
        const rent_id = req.params._id;
        const obj_rent = await Rent.findById(rent_id);
        updates.forEach((update) => (obj_rent[update] = req.body[update]));
        await obj_rent.save();
        res.status(201).send(obj_rent);
    } catch (e) {
        console.error(e);
        res.status(400).send();
    }
};

module.exports = {
    createRent,
    cancelRent,
    getUserRents,
    getUserRentByProduct,
    updateRent,
};
