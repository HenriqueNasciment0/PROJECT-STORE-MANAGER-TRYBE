const sendError = require('../middlewares/sendError');
const Product = require('../models/productsModel');

const isValid = (name) => {
  if (!name) {
    return sendError(400, '"name" is required');
  }

  if (name.length < 5) {
    return sendError(422, '"name" length must be at least 5 characters long');
  }

  return {};
};

const getAll = async () => {
  const products = await Product.getAll();

  return products;
};

const findById = async (id) => {
  const product = await Product.findById(id);

  if (!product) {
    return null;
  }

  return product;
};

const createProduct = async (name) => {
  const validatProduct = isValid(name);

  if (validatProduct.error) return validatProduct;

  const [product] = await Product.createProduct(name);

  return {
    id: product.id,
    name,
  };
};

const updateProduct = async (id, name) => {
  const validatProduct = isValid(name);

  if (validatProduct.error) return validatProduct;

  const realProduct = await Product.findById(id);

  if (!realProduct) {
    return sendError(404, 'Product not found');
  }

  await Product.updateProduct(id, name);

  return { id, name };
};

module.exports = {
  getAll,
  findById,
  createProduct,
  updateProduct,
};
