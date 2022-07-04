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

module.exports = {
  createSales,
  createSalesProducts,
  getAll,
};
