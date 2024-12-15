const newUser = require("../schema/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const nodemailer = require("nodemailer");
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
      jwt.sign(
        { user },
        process.env.JWT_SECRET,
        { expiresIn: "2d" },
        (err, token) => {
          if (err) {
            res.send({ message: "Something went wrong, please try again." });
          }
          res.status(201).send({
            message: "Login successful",
            user: userResponse,
            token: token,
          });
        }
      );
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Something went wrong, please try again." });
  }
};

const ForetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email) {
      return res.status(400).send({ message: "Please provide an email" });
    }

    // Check if the user exists
    const checkUser = await newUser.findOne({ email }); // Fixed: Changed 'user' to 'newUser'
    if (!checkUser) {
      return res.status(400).send({ message: "User not found" });
    }

    // Generate JWT token
    const tokenEmail = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Prepare email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.OWNER_EMAIL, // Use environment variables
        pass: process.env.OWNER_PASS,
      },
    });

    // Email options
    const resetUrl = `http://localhost:4000/reset-password?token=${tokenEmail}`;
    const emailOptions = {
      from: process.env.OWNER_EMAIL,
      to: email,
      subject: "Password Reset Link",
      text: `Click the link to reset your password: ${resetUrl}`,
    };

    // Send the email
    await transporter.sendMail(emailOptions);

    return res.status(200).send({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error in ForgetPassword:", error.message);
    return res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = {
  Signup,
  Login,
  ForetPassword,
};
