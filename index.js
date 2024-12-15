const express = require("express");
require("./db/config");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
require("dotenv").config();

// .........................Api for Signup or login...........................

const user = require("./routes/user");
app.post("/signup", user);
app.post("/login", user);
app.post("/forgetPassword", user);

// .........................Api for Product....................................

const product = require("./routes/product");
app.post("/postProduct", product);
app.get("/getProducts", product);
app.delete("/deleteProduct/:id", product);
app.get("/getProductById/:id/", product);
app.put("/updateProduct/:id/", product);

// .........................Api for Address.....................................
const address = require("./routes/address");
app.post("/address", address);

app.listen(4000, () => console.log("Server running on port 4000"));
