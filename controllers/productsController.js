const Product = require('../services/productsService');

const getAll = async (req, res) => {
  const products = await Product.getAll();

  res.status(200).json(products);
};

const findById = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(Number(id));

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.status(200).json(product);
};

const createProduct = async (req, res) => {
  const { name } = req.body;

  const product = await Product.createProduct(name);

  return res.status(201).json(product);
};

module.exports = {
  getAll,
  findById,
  createProduct,
};
