const Address = require("../schema/address");
const UserAddress = async (req, res) => {
  // Image upload is removed, so we directly handle the data without multer
  const { name, phoneNumber, city, zipCode } = req.body; // image should be a URL or filename

  try {
    // Create a new product without image upload logic
    let newAddress = new Address({
      name,
      phoneNumber,
      city,
      zipCode,
    });

    // Save product to DB
    let result = await newAddress.save();
    console.log("Address added successfully:", result);
    res
      .status(201)
      .send({ message: "Address added successfully", address: result });
  } catch (error) {
    console.error("Error saving address:", error);
    res
      .status(500)
      .send({ message: "Something went wrong, please try again." });
  }
};
module.exports = {
  UserAddress,
};
