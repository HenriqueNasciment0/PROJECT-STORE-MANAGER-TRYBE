const Product = require('../models/productsModel');

const isValid = (name) => {
  if (!name || typeof name !== 'string' || name.length < 5) return false;

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

// const updateProduct = async (id, name) => {
//   const validatProduct = isValid(name);

//   if (!validatProduct) return false;

//   const realProduct = await findById(id);

//   if (!realProduct) {
//     return res.status(404).json({ message: 'Product not found' });
//   }
// };

module.exports = {
  getAll,
  findById,
  createProduct,
};
