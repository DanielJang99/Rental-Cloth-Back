const Product = require("../models/product");
const Clothing = require("../models/clothing");

const createProduct = async (req, res) => {
    const obj_product = new Product(req.body);
    try {
        await obj_product.save();
        const quantity = obj_product.quantity;
        for (let i = 0; i < quantity; i++) {
            const doc_clothing = {
                product_id: obj_product._id,
                isAvailable: true,
                order: i,
            };
            const obj_clothing = new Clothing(doc_clothing);
            await obj_clothing.save();
        }
        res.status(201).send({ obj_product });
    } catch (e) {
        console.error(e);
        res.status(400).send({ error: "failed to create product" });
    }
};

const getProducts = async (req, res) => {
    const obj_product = req.query.search
        ? await Product.find({
              $or: [
                  {
                      name: {
                          $regex: req.query.search,
                          $options: "i",
                      },
                  },
                  {
                      brand: {
                          $regex: req.query.search,
                          $options: "i",
                      },
                  },
              ],
          })
        : req.query.category
        ? await Product.find({
              category: req.query.category,
          })
        : undefined;
    res.status(201).send({ obj_product });
};

const getProductById = async (req, res) => {
    try {
        const product_id = req.params.id;
        const obj_product = await Product.findById(product_id);
        obj_product
            ? res.status(201).send({ product: obj_product })
            : new Error("product does not exist");
    } catch (e) {
        res.status(400).send({ error: "failed to fetch product" });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
};
