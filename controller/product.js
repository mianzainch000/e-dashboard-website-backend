const Product = require("../schema/product");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "uploads/";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath); // Folder where the images will be saved
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Append the extension of the file
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const mimeType = allowedTypes.test(file.mimetype);
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb(new Error("Only .jpg, .jpeg, .png formats are allowed"));
  },
}).array("images", 10000); // Accept multiple images (up to 5 files)

const postProduct = async (req, res) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.error("Multer Error:", err);
      return res.status(500).send({ message: "Multer error: " + err.message });
    } else if (err) {
      // An unknown error occurred when uploading.
      console.error("Upload Error:", err);
      return res.status(500).send({ message: "Upload error: " + err.message });
    }

    // If no file was uploaded, return an error
    if (!req.files || req.files.length === 0) {
      console.error("No file received");
      return res.status(400).send({ message: "No image files provided" });
    }

    const { name, price, description } = req.body;
    const images = req.files.map((file) => file.filename); // Array of image filenames

    try {
      // Create a new product
      let newProduct = new Product({
        name,
        price,
        description,

        image: images, // Store image paths in an array
      });

      // Save product to DB
      let result = await newProduct.save();
      console.log("Product added successfully:", result);
      res
        .status(201)
        .send({ message: "Product added successfully", product: result });
    } catch (error) {
      console.error("Error saving product:", error);
      res
        .status(500)
        .send({ message: "Something went wrong, please try again." });
    }
  });
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length > 0) {
      res.status(201).send(products);
    } else {
      res.send({ message: "No Record Found" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Something went wrong, please try again." });
  }
};
const deleteProduct = async (req, res) => {
  try {
    // Find the product by ID and delete it
    const deletedProduct = await Product.deleteOne({ _id: req.params.id });

    res.status(201).send({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Product not found." });
  }
};
const editProduct = async (req, res) => {
  try {
    // Find the product by ID
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).send({ message: "Product not found." });
    }

    res.status(201).send(product);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Something went wrong, please try again." });
  }
};

module.exports = {
  postProduct,
  getProducts,
  deleteProduct,
  editProduct,
};
