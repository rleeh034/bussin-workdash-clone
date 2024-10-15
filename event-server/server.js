const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

const express = require("express");
const mongoose = require("mongoose");
const eventRoutes = require("./routes/event");
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

// routes
app.use("/api/event", eventRoutes);

const PORT = process.env.PORT || 5002;

app.listen(
  PORT,
  console.log(`*** Server started on PORT ${PORT} ***`.yellow.bold)
);

module.exports = app