console.log("👉 authController loaded");

const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password });

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });

  } catch (error) {
    console.error("❌ Register Error:", error.message);
    res.status(500).json({ message: "Server error during register" });
  }
};

// LOGIN USER
const authUser = async (req, res) => {
  try {
    console.log("🟡 LOGIN REQUEST BODY: ", req.body);

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email & Password required" });
    }

    const user = await User.findOne({ email });
    console.log("🔍 FOUND USER:", user);

    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await user.matchPassword(password);
    console.log("🔑 PASSWORD MATCH:", isMatch);

    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    return res.json({
      message: "Login Successful 🎉",
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });

  } catch (error) {
    console.error("❌ Login Error:", error.message);
    res.status(500).json({ message: "Server error during login" });
  }
};

module.exports = { registerUser, authUser };


