const { expect } = require('chai');
// const sinon = require('sinon');
// const SalesModel = require('../../../models/salesModel');
const sendError = require('../../../middlewares/sendError');
const SalesService = require('../../../services/salesService');

describe('Lê todas as vendas no BD na camada Service', () => {

  describe('quando é lido com sucesso', () => {

    it('retorna um objeto com todos os produtos', async () => {
      const response = await SalesService.getAll();

      expect(response).to.be.a('array').lengthOf(3);
    });

    it('objeto possui o "id" do produto verificado', async () => {
      const response = await SalesService.findById(1);

      expect(response).to.have.a('array').length(2)
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
    });

    // describe('quando o payload informado não é válido', () => {
    //   it('retorna um boolean', async () => {
    //     const response = await SalesService.createProduct(payloadProduct);

    //     expect(response).to.be.a('error');
    //   })

    //   it('o boolean contém "false"', async () => {
    //     const response = await SalesService.createProduct(payloadProduct);

    //     expect(response).to.be.equal(false);
    //   })
    // })

    // describe('quando o payload informado é válido', () => {
    //   const payloadProduct = 'ThunderCats';

    //   it('retorna um objeto camada Service', async () => {

    //     const response = await SalesService.createProduct(payloadProduct);

    //     expect(response).to.be.a('object');
    //   })

    //   it('o objeto possui o id do novo produto inserido camada Service', async () => {

    //     const response = await SalesService.createProduct(payloadProduct);

    //     expect(response).to.have.a.property('id');
    //   })
    // })

  })
});
