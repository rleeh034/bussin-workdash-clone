const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const companySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

// static signup method
companySchema.statics.signup = async function (name) {
  // validation
  const exists = await this.findOne({ name });

  if (exists) {
    throw Error("Company is already registered");
  }

  const company = await this.create({ name });

  return company;
};

module.exports = mongoose.model("Company", companySchema);
