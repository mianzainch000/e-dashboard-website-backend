const express = require("express");
const routes = express.Router();
const {
  Signup,
  Login,
  ForetPassword,
  ResetPassword,
} = require("../controller/user");
routes.route("/signup").post(Signup);
routes.route("/login").post(Login);
routes.route("/forgotPassword").post(ForetPassword);
routes.route("/resetPassword/:tokenEmail").post(ResetPassword);

module.exports = routes;
