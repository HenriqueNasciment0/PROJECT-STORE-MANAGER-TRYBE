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

const updateProduct = async (id, name) => {
  const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
  const [up] = await connection.execute(query, [name, id]); // necessário colocar name e depois id,
  // na ordem que é chamada na query... perdi um tempo nesse detalhe.
  return up;
};

const deleteProduct = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?';
  const [del] = await connection.execute(query, [id]);

  return del;
};

module.exports = {
  getAll,
  findById,
  createProduct,
  updateProduct,
  deleteProduct,
};
