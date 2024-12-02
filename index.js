const express = require("express");
require("./db/config");

const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// .........................Api for Signup or login...........................

const user = require("./router/user");
const product = require("./router/product");
app.post("/signup", user);
app.post("/login", user);
app.post("/postProduct", product);

app.listen(4000, () => console.log("Server running on port 4000"));
