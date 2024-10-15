const Product = require("../models/productModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "90d" });
};

// get all products
const getProducts = async (req, res) => {
  const company_name = req.query.company_name
  const products = await Product.find({ company_name }).sort({ createdAt: -1 });

  res.status(200).json({Product: products});
};

// create new event
const createProduct = async (req, res) => {
  const { name, quantity, price, company_name } = req.body;

  try {
    const product = await Product.create({ name, quantity, price, company_name });

    const token = createToken(product._id);

    res.status(200).json({product, token});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// edit product
const editProduct = async (req, res) => {
  const id = req.params.id;
  const { name, quantity, price } = req.body;

  await Product.findByIdAndUpdate(id, {
    name: name,
    quantity: quantity,
    price: price
  });
  const products = await Product.findById(id);
  res.json({ Product: products });
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;

  await Product.findByIdAndDelete(id);
};

module.exports = {
  getProducts,
  createProduct,
  deleteProduct,
  editProduct
};
