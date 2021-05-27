const express = require("express");
const router = express.Router();
const storeController = require("../../controllers/store.controller");
const storeValidator = require("../../validators/store.validator");
const auth = require("../../middlewares/auth.middleware");
/*
  @route api/store/add
  @access protected
  @desc creates a store
*/
router.post(
  "/add",
  auth,
  storeValidator.addStoreValidator,
  storeController.addStore
);

/*
  @route api/store/delete
  @access protected
  @desc deletes store from db
*/
router.delete("/delete/:id", auth, storeController.deleteStore);

/*
  @route api/store/
  @access protected
  @desc gets all the stores from db
*/
router.get("/", auth, storeController.getStores);

/*
  @route api/store/delete
  @access protected
  @desc deletes store from db
*/
router.get("/:id", auth, storeController.getSingleStore);

/*
  @route api/store/update/:id
  @access protected
  @desc update store from db
*/
router.put(
  "/update/:id",
  auth,
  storeValidator.addStoreValidator,
  storeController.updateStore
);

module.exports = router;
