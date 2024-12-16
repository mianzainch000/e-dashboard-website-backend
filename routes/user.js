const express = require("express");
const routes = express.Router();
const {
  Signup,
  Login,
  ForgotPassword,
  ResetPassword,
} = require("../controller/user");
routes.route("/signup").post(Signup);
routes.route("/login").post(Login);
routes.route("/forgotPassword").post(ForgotPassword);
routes.route("/resetPassword/:tokenEmail").post(ResetPassword);

module.exports = routes;
