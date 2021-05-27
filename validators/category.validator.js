const { check, validationResult } = require("express-validator");

const addCategoryValidator = [
  check("name", "category name is required").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  addCategoryValidator,
};
