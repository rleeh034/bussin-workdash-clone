const mongoose = require("mongoose");

const testFinance = async (req, res) => {
  res.status(200).json({ message: 'Test finance-server' });
};

module.exports = {
  testFinance
};
