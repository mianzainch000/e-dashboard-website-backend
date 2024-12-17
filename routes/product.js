const express = require("express");
const routes = express.Router();

const {
  postProduct,
  getProducts,
  deleteProduct,
  GetProductById,
  updateProduct,
} = require("../controller/product");

routes.post("/postProduct", postProduct);

routes.get("/getProducts", getProducts);

routes.delete("/deleteProduct/:id", deleteProduct);

routes.get("/getProductById/:id", GetProductById);

routes.put("/updateProduct/:id", updateProduct);

module.exports = routes;
