const express = require("express");

// controller functions
const {
  signupCompany,
  viewCompany,
  editCompany,
  deleteCompany,
  testCompany
} = require("../controllers/companyController");

const router = express.Router();

//signup route
router.post("", signupCompany);

//view route
router.get("/view", viewCompany);

//edit company name
router.put("/view/:id", editCompany);

//delete company name
router.delete("/view/:id", deleteCompany);

//test company
router.get("/test", testCompany);

module.exports = router;
