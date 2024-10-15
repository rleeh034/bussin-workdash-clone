const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

const express = require("express");
const mongoose = require("mongoose");
const companyRoutes = require("./routes/company");
const connectDB = require("./config/db");

connectDB();
// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/company", companyRoutes);

const PORT = process.env.PORT || 5001;

app.listen(
  PORT,
  console.log(`*** Server started on PORT ${PORT} ***`.yellow.bold)
);

module.exports = app;
