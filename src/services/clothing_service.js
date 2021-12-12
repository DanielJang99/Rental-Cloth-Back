const Clothing = require("../models/clothing");
const Product = require("../models/product");

const getAvailableClothing = async (product_id) => {
    const obj_clothing = await Clothing.findOne({
        product_id: product_id,
        isAvailable: true,
    });
    return obj_clothing;
};

const updateClothingForRent = async (obj_clothing) => {
    const { isAvailable, product_id } = obj_clothing;
    if (isAvailable) {
        obj_clothing["isAvailable"] = false;
        await obj_clothing.save();
        const availableClothings = await Clothing.findOne({
            isAvailable: true,
            product_id: product_id,
        });
        if (!availableClothings) {
            const obj_product = await Product.findById(product_id);
            obj_product["isAvailable"] = false;
            await obj_product.save();
        }
        return true;
    }
    return false;
};

module.exports = { getAvailableClothing, updateClothingForRent };
