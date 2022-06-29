const connection = require('./connection');

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

  if (productsData.length === 0) return null;

  return productsData[0];
};

const createProduct = async (name) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
  const [product] = await connection.execute(query, [name]);

  return [{ id: product.insertId, name }];
};

module.exports = {
  getAll,
  findById,
  createProduct,
};
