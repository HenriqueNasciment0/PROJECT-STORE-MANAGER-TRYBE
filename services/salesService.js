const SalesModel = require('../models/salesModel');
const sendError = require('../middlewares/sendError');
const ProductModel = require('../models/productsModel');

const isValid = (salesProducts) => {
  switch (true) {
    case salesProducts.some((product) => !product.productId):
      return sendError(400, '"productId" is required');
    case salesProducts.some((product) => !product.quantity && product.quantity !== 0):
      return sendError(400, '"quantity" is required');
    case salesProducts.some((product) => product.quantity <= 0):
      return sendError(422, '"quantity" must be greater than or equal to 1');
    default:
      return {};
  }
};

const createSales = async (salesProducts) => {
  const validateSales = isValid(salesProducts);

  console.log(validateSales);

  if (validateSales.error) {
    return validateSales;
  }

  const validateId = await Promise.all(salesProducts
    .map((product) => ProductModel.findById(product.productId)));

  if (validateId.some((product) => !product)) {
    return sendError(404, 'Product not found');
  }

  const salesId = await SalesModel.createSales();

  await Promise.all(salesProducts.map((product) => SalesModel
      .createSalesProducts(salesId, product.productId, product.quantity)));

  return { id: salesId, itemsSold: salesProducts };
};

const getAll = async () => {
  const sales = await SalesModel.getAll();

  return sales;
};

const findById = async (id) => {
  const sale = await SalesModel.findById(id);

  if (!sale) {
    return sendError(404, 'Sale not found');
  }

  return sale;
};

const deleteSale = async (id) => {
  const realSale = await SalesModel.findById(id);

  if (!realSale) {
    return sendError(404, 'Sale not found');
  }

  return SalesModel.deleteSale(id);
};

const updateSales = async (saleId, salesProducts) => {
  const validateSales = isValid(salesProducts);

  if (validateSales.error) return validateSales;

  const validateIdProduct = await Promise.all(salesProducts
    .map((product) => ProductModel.findById(product.productId)));

  if (validateIdProduct.some((id) => !id)) return sendError(404, 'Product not found');

  const allSales = await SalesModel.getAll();

  const validateIdSales = allSales.some((sale) => sale.saleId === saleId);

  if (!validateIdSales) return sendError(404, 'Sale not found');

  await Promise.all(salesProducts.map((product) => SalesModel
    .updateSales(saleId, product.productId, product.quantity)));

  const results = { saleId, itemsUpdated: salesProducts };

  return results;
};

module.exports = {
  createSales,
  getAll,
  findById,
  deleteSale,
  updateSales,
};
