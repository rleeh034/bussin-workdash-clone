const express = require("express");

const {
  testFinance
} = require("../controllers/financeController");

const router = express.Router();

// test
router.get("/test", testFinance);

module.exports = router;
