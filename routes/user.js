const express = require("express");
const routes = express.Router();
const { Signup, Login, ForetPassword } = require("../controller/user");
routes.route("/signup").post(Signup);
routes.route("/login").post(Login);
routes.route("/forgetPassword").post(ForetPassword);

module.exports = routes;
