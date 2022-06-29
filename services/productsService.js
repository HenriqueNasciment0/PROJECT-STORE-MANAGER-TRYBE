const Product = require('../models/productsModel');

const isValid = (name) => {
  if (!name || typeof name !== 'string') return false;

  return true;
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

  if (!validatProduct) return false;

  const [product] = await Product.createProduct(name);

  return {
    id: product.id,
    name,
  };
};

module.exports = {
  getAll,
  findById,
  createProduct,
};
