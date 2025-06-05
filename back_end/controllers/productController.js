const { body, validationResult } = require("express-validator");
const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description, category, subcategory, variants, images } =
      req.body;

    const newProduct = new Product({
      title,
      description,
      category,
      subcategory,
      variants,
      images,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.validate = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("category").isMongoId().withMessage("Invalid category ID"),
  body("subcategory").isMongoId().withMessage("Invalid subcategory ID"),
  body("variants")
    .isArray()
    .withMessage("Variants must be an array")
    .notEmpty()
    .withMessage("At least one variant is required"),
  body("images")
    .isArray()
    .withMessage("Images must be an array")
    .notEmpty()
    .withMessage("At least one image is required"),
];

// get api  product

exports.getProducts = async (req, res) => {
  try {
    const { subcategory, search, page = 1, limit = 10 } = req.query;

    const query = {};

    if (subcategory) {
      query.subcategory = subcategory;
    }

    if (search) {
      query.title = { $regex: search.trim(), $options: "i" };
    }

    const products = await Product.find(query)
      .populate("subcategory", "name")
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    const total = await Product.countDocuments(query);

    res.json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
      products,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
