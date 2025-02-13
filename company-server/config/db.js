const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //useFindAndModify: true,
    });

    console.log(
      `*** MongoDB Connected: ${conn.connection.host}`.cyan.underline
    );
  } catch (error) {
    console.log(`*** Error connecting to DB: ${error.message}`.red.underline);
    process.exit();
  }
};

module.exports = connectDB;
