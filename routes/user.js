const express = require("express");
const routes = express.Router();
const {
  Signup,
  Login,
  ForgotPassword,
  ResetPassword,
} = require("../controller/user");
routes.post("/signup", Signup);
routes.post("/login", Login);
routes.post("/forgotPassword", ForgotPassword);
routes.post("/resetPassword/:tokenEmail", ResetPassword);

module.exports = routes;
