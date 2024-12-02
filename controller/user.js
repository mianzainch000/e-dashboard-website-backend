const newUser = require("../schema/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "hahahahahaah";
const Signup = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    let existingUser = await newUser.findOne({ email });
    if (existingUser) {
      return res.send({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let user = new newUser({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    let result = await user.save();

    result = result.toObject();
    delete result.password;

    res
      .status(201)
      .send({ message: "Account created successfully", user: result });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Something went wrong, please try again." });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await newUser.findOne({ email });
    if (!user) {
      return res.send({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    const userResponse = user.toObject();
    delete userResponse.password;

    if (user) {
      jwt.sign({ user }, JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
        if (err) {
          res.send({ message: "Something went wrong, please try again." });
        }
        res.status(201).send({
          message: "Login successful",
          user: userResponse,
          token: token,
        });
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Something went wrong, please try again." });
  }
};
module.exports = {
  Signup,
  Login,
};
