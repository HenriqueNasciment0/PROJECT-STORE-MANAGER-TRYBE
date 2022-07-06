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

const findById = async (req, res, next) => {
  const { id } = req.params;

  const sale = await SalesService.findById(id);

  if (sale.error) {
    return next(sale.error);
  }

  res.status(200).json(sale);
};

const deleteSale = async (req, res, next) => {
  const { id } = req.params;

  const sale = await SalesService.deleteSale(id);

  if (sale.error) return next(sale.error);

  res.status(204).json(sale);
};

module.exports = {
  createSales,
  getAll,
  findById,
  deleteSale,
};
