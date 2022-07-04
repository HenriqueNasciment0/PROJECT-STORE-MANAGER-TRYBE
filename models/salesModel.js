const connection = require('./connection');

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

module.exports = {
  createSales,
  createSalesProducts,
};
