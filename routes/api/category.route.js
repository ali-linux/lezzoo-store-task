const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/category.controller");
const categoryValidator = require("../../validators/category.validator");
const auth = require("../../middlewares/auth.middleware");

/*
  @route api/category/add
  @access protected
  @desc creates a store
*/
router.post(
  "/store/:id/add",
  auth,
  categoryValidator.addCategoryValidator,
  categoryController.addCategory
);

/*
  @route api/category/delete
  @access protected
  @desc deletes category from db
*/
router.delete("/delete/:id", auth, categoryController.deleteCategory);

/*
  @route api/category/
  @access protected
  @desc gets all the categories from db
*/
router.get("/store/:id", auth, categoryController.getCategories);

/*
  @route api/category/:id
  @access protected
  @desc retrieves single category from db
*/
router.get("/:id", auth, categoryController.getSingleCategory);

/*
  @route api/category/update/:id
  @access protected
  @desc update category from db
*/
router.put(
  "/update/:id",
  auth,
  categoryValidator.addCategoryValidator,
  categoryController.updateCategory
);

module.exports = router;
