const express = require("express");
const routes = express.Router();
const {
  postProduct,
  getProducts,
  deleteProduct,
  GetProductById,
  updateProduct,
} = require("../controller/product");

routes.route("/postProduct").post(postProduct);

routes.route("/getProducts").get(getProducts);

routes.route("/deleteProduct/:id").delete(deleteProduct);

routes.route("/getProductById/:id").get(GetProductById);

routes.route("/updateProduct/:id").put(updateProduct);

module.exports = routes;
