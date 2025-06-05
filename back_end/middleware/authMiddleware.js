const jwt = require("jsonwebtoken");

// Middleware to authenticate user with Bearer token
const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ msg: "Admin access required" });
    }

    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = { auth, isAdmin };
``