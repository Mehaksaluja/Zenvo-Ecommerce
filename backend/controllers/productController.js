import Product from "../models/productModel.js";
import asyncHandler from 'express-async-handler';

/**
 * @desc    Fetch a single product by its ID
 * @route   GET /api/products/:id
 * @access  Public
 */

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
})

/**
 * @desc    Fetch a single product by its ID
 * @route   GET /api/products/:id
 * @access  Public
 */

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
})

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ msg: "Product removed" });
  } else {
    res.status(404);
    throw new error("Product not found")
  }
})

const createProduct = asyncHandler(async (req, res) => {

  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export { getProducts, getProductById, deleteProduct, createProduct, updateProduct }