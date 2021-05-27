const { check, validationResult } = require("express-validator");

const addStoreValidator = [
  check("name", "name is required").not().isEmpty().trim(),
  check("email", "email is required").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  addStoreValidator,
};
