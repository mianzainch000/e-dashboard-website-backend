const Address = require("../schema/address");
const UserAddress = async (req, res) => {
  const { name, phoneNumber, city, zipCode } = req.body;

  try {
    let newAddress = new Address({
      name,
      phoneNumber,
      city,
      zipCode,
    });

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
