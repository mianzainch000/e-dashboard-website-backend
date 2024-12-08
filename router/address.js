const express = require("express");
const router = express.Router();
const { UserAddress } = require("../controller/address");
router.route("/address").post(UserAddress);

module.exports = router;
