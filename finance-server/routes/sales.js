const express = require("express");

const {
  getUserSales,
  getUserDailyRevenueByMonth,
  getCompanyDailyRevenueByMonth,
  getCompanySalesByMonth,
  createSale,
} = require("../controllers/saleController");

const router = express.Router();

// GET all sales for the user for the current month
router.get("/user", getUserSales);

// GET daily revenue for the user for the current month
router.get("/userRevenue", getUserDailyRevenueByMonth);

// GET daily revenue for the company for the current month
router.get("/companyRevenue", getCompanyDailyRevenueByMonth);

// GET daily revenue for the company for the current month
router.get("/companySales", getCompanySalesByMonth);

// POST a new sale
router.post("", createSale);

module.exports = router;
