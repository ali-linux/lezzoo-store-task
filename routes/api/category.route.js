const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/category.controller");
const categoryValidator = require("../../validators/category.validator");
const auth = require("../../middlewares/auth.middleware");

module.exports = router;
