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

module.exports = {
  createSales,
};
