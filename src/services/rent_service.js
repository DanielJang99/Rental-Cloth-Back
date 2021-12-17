var mongoose = require("mongoose");
const Clothing = require("../models/clothing");
const ObjectId = mongoose.Types.ObjectId;

const Product = require("../models/product");
const Rent = require("../models/rent");
const {
    getAvailableClothing,
    updateClothingForRent,
} = require("./clothing_service");

const processRent = async (rent_data) => {
    const { product_id } = rent_data;
    const obj_product = await Product.findById(product_id);
    try {
        const { is_rental } = obj_product;
        const obj_clothing = await getAvailableClothing(product_id);
        if (!obj_clothing) {
            throw new Error("해당 제품은 현재 품절입니다.");
        }
        if (!is_rental) {
            await updateClothingForRent(obj_clothing);
        }
        rent_data["clothing_id"] = obj_clothing._id;
        const obj_rent = new Rent(rent_data);
        await obj_rent.save();
        return obj_rent;
    } catch (e) {
        return { error: e.message };
    }
};

const processRentCancellation = async (rent_id) => {
    rent_id = ObjectId(rent_id);
    try {
        const obj_rent = await Rent.findOne({
            _id: rent_id,
            status: { $ne: "cancelled" },
        });
        const { product_id, clothing_id } = obj_rent;
        obj_rent["status"] = "cancelled";
        await obj_rent.save();

        obj_product = await Product.findOne({ _id: product_id });
        obj_product["isAvailable"] = true;
        await obj_product.save();

        obj_clothing = await Clothing.findOne({ _id: clothing_id });
        obj_clothing["isAvailable"] = true;
        await obj_clothing.save();
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
};

module.exports = { processRent, processRentCancellation };
