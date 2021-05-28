const express = require("express");
const router = express.Router();
const storeController = require("../../controllers/store.controller");
const storeValidator = require("../../validators/store.validator");
const auth = require("../../middlewares/auth.middleware");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "client/src/images/");
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
  upload.single("imageFile"),
  storeValidator.addStoreValidator,
  storeController.updateStore
);

router.post("/upload", auth, upload.single("imageFile"), (req, res, next) => {
  return res.send(req.file.path);
});

module.exports = router;
