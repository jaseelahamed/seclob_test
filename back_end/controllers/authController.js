const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    console.log(name, email, password,"name, email, password")
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    // Register as customer by default
    user = new User({ name, email, password, role: "customer" });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = { id: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// Admin or Customer Login
exports.login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ msg: "Invalid Credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

    // Optional: Check for role match
    if (role && user.role !== role)
      return res.status(403).json({ msg: `Only ${role} can log in` });

    const payload = { id: user._id, role: user.role };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (err) {
    res.status(500).send("Server error");
  }
};