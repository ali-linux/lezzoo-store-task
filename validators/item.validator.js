const { check, validationResult } = require("express-validator");

const addItemValidator = [
  check("name", "Item name is required").not().isEmpty(),
  check("price", "price is required and it should be number")
    .not()
    .isEmpty()
    .isNumeric(),
  check("stock", "stock is required and it should be number")
    .not()
    .isEmpty()
    .isNumeric(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  addItemValidator,
};
