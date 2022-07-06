const connection = require('../helpers/connection');

const createSales = async () => {
  const query = 'INSERT INTO StoreManager.sales () VALUES ()';
  const [item] = await connection.execute(query);

  return item.insertId;
};

const createSalesProducts = async (salesId, productId, quantity) => {
    const query = `INSERT INTO StoreManager.sales_products
    (sale_Id, product_id, quantity) VALUES (?,?,?)`;

    const [sales] = await connection.execute(query, [salesId, productId, quantity]);

    return sales;
};

const getAll = async () => {
  const query = `SELECT sale_id saleId, date, product_id productId, quantity
FROM StoreManager.sales
INNER JOIN StoreManager.sales_products
  ON sales.id = sales_products.sale_Id`;
  const [data] = await connection.execute(query);

  return data;
};

const findById = async (id) => {
  const query = `SELECT sales.date,
  sales_products.product_id productId,
  sales_products.quantity
  FROM StoreManager.sales sales
  INNER JOIN StoreManager.sales_products sales_products
  ON sales.id = sales_products.sale_id
  WHERE id = ?`;

  const [data] = await connection.execute(query, [id]);

  if (data.length === 0) return null;

  return data;
};

const deleteSale = async (id) => {
  const query = 'DELETE FROM StoreManager.sales WHERE id = ?';
  const [del] = await connection.execute(query, [id]);

  return del;
};

// const updateSales = async (salesId, productId, quantity) => {
//   const query = 'UPDATE StoreManager.sales SET product_id, quantity WHERE id = ?';

//   const [up] = await connection.execute(query, [salesId, productId, quantity]);

//   return up;
// };

module.exports = {
  createSales,
  createSalesProducts,
  getAll,
  findById,
  deleteSale,
};
