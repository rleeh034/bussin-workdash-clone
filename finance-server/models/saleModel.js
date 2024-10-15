const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const saleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    revenue: {
      type: Number,
      required: true,
    },
    product_id: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sale", saleSchema);
