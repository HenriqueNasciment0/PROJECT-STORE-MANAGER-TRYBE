const connection = require('../helpers/connection');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return products;
};

const findById = async (id) => {
  const query = `
    SELECT * FROM StoreManager.products
    WHERE id = ?
  `;

  const [productsData] = await connection.execute(query, [id]);

  // if (productsData.length === 0) return null;

  return productsData[0];
};

const createProduct = async (name) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
  const [product] = await connection.execute(query, [name]);

  return [{ id: product.insertId }];
};

// const updateProduct = async (id, name) => {
//   const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
//   const product = await connection.execute(query, [id, name]);

//   return product;
// };

module.exports = {
  getAll,
  findById,
  createProduct,
  // updateProduct,
};
