const SalesService = require('../services/salesService');

const createSales = async (req, res, next) => {
  const salesProducts = req.body;

  const sales = await SalesService.createSales(salesProducts);

  if (sales.error) {
    return next(sales.error);
  }

  res.status(201).json(sales);
};

const getAll = async (_req, res) => {
  const allSales = await SalesService.getAll();

  res.status(200).json(allSales);
};

module.exports = {
  createSales,
  getAll,
};
