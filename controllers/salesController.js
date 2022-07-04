const SalesService = require('../services/salesService');

const createSales = async (req, res, next) => {
  const salesProducts = req.body;

  const sales = await SalesService.createSales(salesProducts);

  if (sales.error) {
    return next(sales.error);
  }

  res.status(201).json(sales);
};

module.exports = {
  createSales,
};
