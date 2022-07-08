const { expect } = require('chai');
const sinon = require('sinon');
const SalesModel = require('../../../models/salesModel');
const sendError = require('../../../middlewares/sendError');
const SalesService = require('../../../services/salesService');

describe('Testa endpoit Sales na camada Service', () => {

  describe('quando todas as Sales são lidas com sucesso', () => {

    it('retorna um objeto com todos os produtos', async () => {
      const response = await SalesService.getAll();

      expect(response).to.be.a('array').lengthOf(1);
    });

    it('objeto possui o "id" do produto verificado', async () => {
      const response = await SalesService.findById(2);

      expect(response).to.be.a('array')
    });

  });

  describe('Insere uma nova venda no BD', () => {
    describe('quando o produtoId não é válido', () => {
      describe('quando o productId não existe', () => {

        it('recebe um erro', async () => {
          const error = sendError(400, '"productId" is required');
          const sale = await SalesService.createSales([
            {
              "quantity": 1
            },
            {
              "productId": 2,
              "quantity": 5
            }
          ]);

          expect(sale).to.be.eqls(error);
        });
      });
      describe('quando o quantity não existe', () => {

        it('recebe um erro', async () => {
          const error = sendError(400, '"quantity" is required');
          const product = await SalesService.createSales([
            {
              "productId": 1,
              "quantity": ''
            },
            {
              "productId": 2,
              "quantity": ''
            }
          ]);

          expect(product).to.be.eqls(error);
        });
      });

      describe('quando o quantity é <= 0', () => {

        it('recebe um erro', async () => {
          const error = sendError(422, '"quantity" must be greater than or equal to 1');
          const sale = await SalesService.createSales([
            {
              "productId": 1,
              "quantity": 1
            },
            {
              "productId": 2,
              "quantity": -1
            }
          ]);

          expect(sale).to.be.eqls(error);
        });
      });

      describe('Quando tenta deletar um sale', () => {

        it('recebe um erro 404 se a venda não existir', async () => {
          const error = sendError(404, 'Sale not found');
          const sale = await SalesService.deleteSale(999);

          expect(sale).to.be.eqls(error);
        });
      });

      describe('quando cria uma venda', () => {

        beforeEach(() => {
          sinon.stub(Promise, 'all').resolves([
            {
              "productId": 1,
              "quantity": 1
            },
            {
              "productId": 2,
              "quantity": 5
            }
          ]);
          sinon.stub(SalesModel, 'createSales').resolves(3);
          sinon.stub(SalesModel, 'createSalesProducts').resolves();
        });

        afterEach(() => {
          Promise.all.restore();
          SalesModel.createSales.restore();
          SalesModel.createSalesProducts.restore();
        });

        it('recebe um objeto', async () => {
          const salesProduct = await SalesService.createSales([
            {
              "productId": 1,
              "quantity": 1
            },
            {
              "productId": 2,
              "quantity": 5
            }
          ]);

          expect(salesProduct).to.be.eqls({
            "id": 3,
            "itemsSold": [
              {
                "productId": 1,
                "quantity": 1
              },
              {
                "productId": 2,
                "quantity": 5
              }
            ]
          });
        });
      });
    });

  });
});
