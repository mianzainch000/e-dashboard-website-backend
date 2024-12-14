const express = require("express");
const routes = express.Router();
const { UserAddress } = require("../controller/address");
routes.route("/address").post(UserAddress);

module.exports = routes;
