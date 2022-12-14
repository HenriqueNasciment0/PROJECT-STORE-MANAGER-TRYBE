const Product = require('../services/productsService');

const getAll = async (req, res) => {
  const products = await Product.getAll();

  return res.status(200).json(products);
};

const findById = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(Number(id));

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.status(200).json(product);
};

const createProduct = async (req, res) => {
  const { name } = req.body;

  const product = await Product.createProduct(name);

  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }

  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }

  return res.status(201).json(product);
};

const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const newProduct = await Product.updateProduct(id, name);

  if (newProduct.error) return next(newProduct.error);

  res.status(200).json(newProduct);
};

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.deleteProduct(id);

  if (product.error) return next(product.error);

  res.status(204).json(product);
};

const searchProduct = async (req, res) => {
  const { q } = req.query;

  const products = await Product.getAll();

  const product = await Product.searchProduct(q);

  if (!q) {
    return res.status(200).json(products);
  }

  return res.status(200).json(product);
};

module.exports = {
  getAll,
  findById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};
