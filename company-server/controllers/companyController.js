const Company = require("../models/companyModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const axios = require("axios");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "90d" });
};

// Signup company
const signupCompany = async (req, res) => {
  const { name } = req.body;

  try {
    const company = await Company.signup(name);

    //create a token
    const token = createToken(company._id);

    res.status(200).json({ name, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const viewCompany = async (req, res) => {
  const companies = await Company.find();

  res.status(200).json({ Company: companies });
};

const editCompany = async (req, res) => {
  try {
    const companyObjectId = req.params.id;
    const { name } = req.body;

    const company = await Company.findById(companyObjectId);
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }
    const currentCompanyName = company.name;

    // Update the company name in the Company collection
    await Company.findByIdAndUpdate(companyObjectId, {
      name: name,
    });

    const response = await axios.put("http://localhost:5000/api/user/bulkupdate", {
      oldCompany: currentCompanyName, // old company name
      newCompany: name, // new company name
    });

    res.json({ Company: { ...company._doc, name } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteCompany = async (req) => {
  const companyObjectId = req.params.id;
  await Company.findByIdAndDelete(companyObjectId);
};

const testCompany = async (req, res) => {
  res.status(200).json({ message: 'Test company-server' });
};


module.exports = {
  signupCompany,
  viewCompany,
  editCompany,
  deleteCompany,
  testCompany
};
