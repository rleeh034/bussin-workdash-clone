const express = require("express");

// controller functions
const { loginUser, signupUser, viewUser, viewSingleUser, editUser, deleteUser, bulkUpdateUsers, testUser } = require("../controllers/userController");

const router = express.Router();

// login route
router.post("/login", loginUser);

// signup route
router.post("", signupUser);

//view all users
router.get("/view", viewUser);

//view individual usery
router.get("/view/:id", viewSingleUser);

//update
router.put("/view/:id", editUser);

//update
router.put("/bulkupdate", bulkUpdateUsers);

//delete
router.delete("/view/:id", deleteUser);

//test
router.get("/test", testUser);

module.exports = router;
