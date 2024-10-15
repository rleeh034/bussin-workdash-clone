const Sale = require("../models/saleModel");
const Product = require("../models/productModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "90d" });
};

// get all User sales for current calendar month
const getUserSales = async (req, res) => {
  const user_id = req.query.id
  const date = new Date(req.query.date)
  
  const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);

  const sales = await Sale.find({ 
    user_id: user_id,
    createdAt: {
      $gt: startDate,
      $lte: endDate
    }
  }).sort({ createdAt: -1 });

  res.status(200).json({Sale: sales});
};

// get User daily revenue for current calendar month
const getUserDailyRevenueByMonth = async (req, res) => {
  const user_id = req.query.id
  const date = new Date(req.query.date)

  const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);

  const revenuePerDay = await Sale.aggregate([
    {
      $match: {
        user_id: user_id,
        createdAt: {$gt: startDate, $lte: endDate}
      }
    },
    {
      $group: {
        _id: {$dateToString: { format: "%d", date: "$createdAt"}},
        total: {$sum: "$revenue"}
      }
    }
  ]).sort({ _id: 1 });

  let cumulativeTotal = 0;
  const cumulativeRevenuePerDay = []

  for (let i = 1; i <= date.getDate(); i++) {
    const exists = revenuePerDay.find(revenue => parseInt(revenue._id) === i);

    if (exists) {
      cumulativeTotal += exists.total
    }
    cumulativeRevenuePerDay.push({
      _id: i.toString(),
      cumulativeTotal: cumulativeTotal
    });
  }
  res.status(200).json({CumulativeRevenue: cumulativeRevenuePerDay});
};

// get Company daily revenue for current calendar month
const getCompanyDailyRevenueByMonth = async (req, res) => {
  const company_name = req.query.name
  const date = new Date(req.query.date)

  const products = await Product.find({ company_name })
  const productIds = products.map((product) => product.id.toString())
  const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);

  const revenuePerDay = await Sale.aggregate([
    {
      $match: {
        product_id: {$in: productIds},
        createdAt: {$gt: startDate, $lte: endDate}
      }
    },
    {
      $group: {
        _id: {$dateToString: { format: "%d", date: "$createdAt", timezone:"Asia/Singapore"}},
        total: {$sum: "$revenue"},
        products: { $push: "$name" }
      }
    }
  ]).sort({ _id: 1 });

  let cumulativeTotal = 0;
  const cumulativeRevenuePerDay = []

  for (let i = 1; i <= date.getDate(); i++) {
    const exists = revenuePerDay.find(revenue => parseInt(revenue._id) === i);

    if (exists) {
      cumulativeTotal += exists.total
    }
    cumulativeRevenuePerDay.push({
      _id: i.toString(),
      cumulativeTotal: cumulativeTotal
    });
  }

  res.status(200).json({CumulativeRevenue: cumulativeRevenuePerDay});
};

// get Company sales in the past week
const getCompanySalesByMonth = async (req, res) => {
  const company_name = req.query.name
  const date = new Date(req.query.date)

  const products = await Product.find({ company_name })
  const productIds = products.map((product) => product.id.toString())
  const productNames = products.map((product) => product.name.toString())
  const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);

  const sales = await Sale.aggregate([
    {
      $match: {
        product_id: {$in: productIds},
        createdAt: {$gt: startDate, $lte: endDate}
      }
    },
    {
      $group: {
        _id: {$dateToString: { format: "%d", date: "$createdAt", timezone:"Asia/Singapore"}},
        productsSold: {$push: { name: "$name", quantity: "$quantity" }}
      }
    }
  ]).sort({ _id: 1 });

const salesArray = [];

sales.forEach(sale => {
  const counts = productNames.map(productName => {
    const productItems = sale.productsSold.filter(inputItem => inputItem.name === productName)
    const totalQuantity = productItems.reduce((total, current) => total + current.quantity, 0)
    return {
        name: productName,
        count: totalQuantity
    };
  });
  
  // Store the counts for this document
  salesArray.push({ _id: sale._id, counts });
});

  res.status(200).json({Sale: salesArray});
};

// create Sale
const createSale = async (req, res) => {
  const { name, quantity, product_id, user_id } = req.body;
  const selectedProduct = await Product.findOne({_id: product_id})
  const revenue = (Math.round(quantity*selectedProduct.price)).toFixed(2)

  // add to db
  try {
    const sale = await Sale.create({ name, quantity, revenue, product_id, user_id });

    // create a token
    const token = createToken(sale._id);

    res.status(200).json({sale, token});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getUserSales,
  getUserDailyRevenueByMonth,
  getCompanyDailyRevenueByMonth,
  getCompanySalesByMonth,
  createSale,
  
};
