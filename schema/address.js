const mongoose = require("mongoose");
const addressSchema = new mongoose.Schema({
  name: String,
  phoneNumber: Number,
  city: String,
  zipCode: Number,
});
module.exports = mongoose.model("address", addressSchema);
