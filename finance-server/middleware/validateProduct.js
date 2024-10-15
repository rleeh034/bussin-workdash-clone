async function validateProduct(req, res, next) {
    const { name, quantity, price  } = req.body;
    let emptyFields = [];
  
    // check if fields are all valid
    if (!name) {
      emptyFields.push("name");
    }
    if (!quantity) {
      emptyFields.push("quantity");
    }
    if (!price) {
      emptyFields.push("price");
    }
    if (emptyFields.length > 0) {
      return res
        .status(400)
        .json({ error: "Please fill in all the fields", emptyFields });
    } 
  
    // continue if all validation passed
    next();
  }

module.exports = validateProduct;