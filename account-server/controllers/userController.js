const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "90d" });
};

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    const userDetail = await User.findOne({ email: email });

    res.status(200).json({ email, token, userDetail });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a user
const signupUser = async (req, res) => {
  const { email, password, name, role, company } = req.body;

  try {
    const user = await User.signup(email, password, name, role, company);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const viewUser = async (req, res) => {
  const company = req.query.company; // Get the company name from the query parameter
  if (!company) {
    return res.status(400).json({ error: "Company name is required in the query parameter." });
  }
  const users = await User.find();
  const filteredUsers = users.filter((user) => user.company === company);
  // Respond
  res.json({ User: filteredUsers });
};

const viewSingleUser = async (req, res) => {
  //get id
  const userId = req.params.id;
  //find User
  const users = await User.findById(userId);
  //respond
  res.json({ User: users });
};

const editUser = async (req, res) => {
  //get ID
  const userObjectId = req.params.id;
  const { name, email, company } = req.body;
  //find and update name
  await User.findByIdAndUpdate(userObjectId, {
    name: name,
    email: email,
    company: company,
  });
  const users = await User.findById(userObjectId);
  res.json({ User: users });
};

const bulkUpdateUsers = async (req, res) => {
  try {
    const { oldCompany, newCompany } = req.body;

    // Find and update user records with the old company name
    const updatedUsers = await User.updateMany({ company: oldCompany }, { company: newCompany });

    // You can return a success message or updated user records if needed
    res.json({ message: "Users updated successfully", updatedCount: updatedUsers.nModified });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating users" });
  }
};

const deleteUser = async (req, res) => {
  //get ID
  const userObjectId = req.params.id;
  //data from req
  const { name } = req.body;
  //find and delete name
  await User.findByIdAndDelete(userObjectId);
};

const testUser = async (req, res) => {
  res.status(200).json({ message: 'Test account-server' });
};

// module.exports = { signupUser, loginUser, getUsers, getUser, updateUser};
module.exports = { signupUser, loginUser, viewUser, viewSingleUser, editUser, deleteUser, bulkUpdateUsers, testUser };
