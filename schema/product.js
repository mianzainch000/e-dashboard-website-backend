const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  stock: [],
  image: [],
});
module.exports = mongoose.model("products", productSchema);
