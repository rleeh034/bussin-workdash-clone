const express = require("express");
const validateProduct = require("../middleware/validateProduct");

const {
  createProduct,
  getProducts,
  deleteProduct,
  editProduct
} = require("../controllers/productController");

const router = express.Router();

// GET all products from company
router.get("", getProducts);

// POST a new product
router.post("", validateProduct, createProduct);

// PUT product details
router.put("/:id", validateProduct, editProduct);

// DELETE a product
router.delete("/:id", deleteProduct);

module.exports = router;
