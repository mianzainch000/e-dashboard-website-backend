const express = require("express");
const routes = express.Router();
const { UserAddress } = require("../controller/address");
routes.post("/address", UserAddress);

module.exports = routes;
