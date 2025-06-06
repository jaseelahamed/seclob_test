// backend/server.js
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();
const app = express();
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const path = require("path");
app.use(express.json());
app.use(cors()); 

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
// Routes
app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/subcategories", require("./routes/subCategoryRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/wishlist", require("./routes/wishlistRoutes"));
app.use("/api/upload", require("./controllers/uploadController"));
// app.use("/uploads", express.static("uploads"));
const PORT = process.env.PORT || 5000;
// Function to create default admin
const createDefaultAdmin = async () => {
    const adminExists = await User.findOne({ role: "admin" });
  
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin123", 10); 
      await User.create({
        name: "Admin User",
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin",
      });
      console.log("Default admin created.");
    }
  };
  
  connectDB()
    .then(async () => {
      await createDefaultAdmin(); 
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error("Database connection error:", err);
    });