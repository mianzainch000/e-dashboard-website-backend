const express = require("express");
const router = express.Router();
const {
  postProduct,
  getProducts,
  deleteProduct,
  GetProductById,
  updateProduct,
} = require("../controller/product");

router.route("/postProduct").post(postProduct);

router.route("/getProducts").get(getProducts);

router.route("/deleteProduct/:id").delete(deleteProduct);

router.route("/getProductById/:id").get(GetProductById);

router.route("/updateProduct/:id").put(updateProduct);

module.exports = router;
