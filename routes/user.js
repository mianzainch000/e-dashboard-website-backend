const express = require("express");
const routes = express.Router();
const { Signup, Login } = require("../controller/user");
routes.route("/signup").post(Signup);
routes.route("/login").post(Login);

module.exports = routes;
