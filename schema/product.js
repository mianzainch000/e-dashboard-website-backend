const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: [],
});
module.exports = mongoose.model("products", productSchema);
