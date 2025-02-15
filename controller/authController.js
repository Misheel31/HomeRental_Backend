const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// const comparePassword = require('../helpers/auth').comparePassword;

const test = (req, res) => {
  res.json("test is working");
};

// Register user
const registerUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, image } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      return res.json({ error: "All fields are required" });
    }

    if (password.length < 6) {
      return res.json({ error: "Password must be at least 6 characters long" });
    }

    if (password !== confirmPassword) {
      return res.json({ error: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ error: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      image,
    });

    await user.save();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      post: 587,
      secure: false,
      protocol: "smtp",
      auth: {
        user: "misheelrai7@gmail.com",
        pass: "xrkq aaze gzsr ssvb",
      },
    });

    const info = await transporter.sendMail({
      from: "misheelrai7@gmail.com",
      to: user.email,
      subject: "User Registration",
      html: `
          <h1> Your Registration has been Completed</h1>
          <p>Your user id is ${user.id}</p>
          `,
    });

    // Remove JWT creation temporarily
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    //   expiresIn: "1d",
    // });

    res.status(201).json({
      message: "User registered successfully",
      user: { username: user.username, email: user.email },
      token: null,
      info,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.json({ error: "An error occurred during registration" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    user.tokens = user.tokens.concat({ token });
    await user.save();

    res.status(200).json({
      message: "Login successful",
      user: {
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "An error occurred during login" });
  }
};

const loginAdmin = async (e) => {
  e.preventDefault();
  const { email, password } = data;

  try {
    const {
      data: { token, user, error },
    } = await axios.post("/admin/login", {
      email,
      password,
    });

    if (error) {
      toast.error(error);
    } else {
      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminUser", JSON.stringify(user));
      setData({
        email: "admin@gmail.com",
        password: "AdminPassword",
      });
      navigate("/admin");
    }
  } catch (error) {
    console.log("Error during login:", error);
    toast.error("An unexpected error occurred during login. Please try again.");
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found:", email);
      return res.status(404).json({ error: "No user found" });
    }

    const token = jwt.sign({ id: user._id }, "jwt_secret_key", {
      expiresIn: "1h",
    });

    res.json({ status: "Token generated", token });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({ status: "Internal Server Error" });
  }
};

const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ error: "User not found" });
    }

    console.log("User:", user);
    console.log("New Password:", newPassword);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    console.log("Updated User:", user);
    return res.json({ success: "Password updated successfully!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "An error  while resetting the password" });
  }
};

module.exports = {
  test,
  registerUser,
  loginUser,
  loginAdmin,
  forgotPassword,
  resetPassword,
};
