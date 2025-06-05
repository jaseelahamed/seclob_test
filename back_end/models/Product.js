const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  ram: String,
  price: Number,
  qty: Number,
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" },
  variants: [variantSchema],
  images: [String],
});
module.exports = mongoose.model("Product", productSchema);