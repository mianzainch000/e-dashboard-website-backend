require("./db/config");
const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
app.use("/uploads", express.static("uploads"));
require("dotenv").config();

const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const addressRoutes = require("./routes/address");

app.use("/", userRoutes);

app.use("/", productRoutes);

app.use("/", addressRoutes);

app.listen(4000, () => console.log("Server running on port 4000"));
