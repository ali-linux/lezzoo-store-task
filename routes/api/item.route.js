const express = require("express");
const router = express.Router();
const itemController = require("../../controllers/item.controller");
const itemValidator = require("../../validators/item.validator");
const auth = require("../../middlewares/auth.middleware");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "client/src/images/items/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

/*
  @route api/item/add
  @access protected
  @desc creates an item 
*/
router.post(
  "/store/:store_id/category/:category_id/add",
  auth,
  upload.single("imageFile"),
  itemValidator.addItemValidator,
  itemController.addItem
);

/*
  @route api/item/delete
  @access protected
  @desc deletes item from db
*/
router.delete("/delete/:id", auth, itemController.deleteItem);

/*
  @route api/item/
  @access protected
  @desc gets all the categories from db
*/
router.get(
  "/store/:store_id/category/:category_id/",
  auth,
  itemController.getItems
);

/*
  @route api/item/:id
  @access protected
  @desc retrieves single item from db
*/
// router.get("/:id", auth, itemController.getSingleItem);

/*
  @route api/item/update/:id
  @access protected
  @desc update item from db
*/
router.put(
  "/update/:id",
  auth,
  upload.single("imageFile"),
  itemValidator.addItemValidator,
  itemController.updateItem
);

module.exports = router;
