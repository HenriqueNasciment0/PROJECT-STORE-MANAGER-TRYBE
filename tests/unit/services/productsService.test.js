const { expect } = require('chai');
const sinon = require('sinon');
const ProductsService = require('../../../services/productsService');
const ProductModel = require('../../../models/productsModel');
const sendError = require('../../../middlewares/sendError');


describe('Lê todas as vendas na camada Service', () => {

  describe('quando é lido com sucesso', () => {
    before(() => {
      sinon.stub(ProductModel, 'getAll').resolves([
        {
          "id": 1,
          "name": "Martelo de Thor"
        },
        {
          "id": 2,
          "name": "Traje de encolhimento"
        },
        {
          "id": 3,
          "name": "Escudo do Capitão América"
        },
        {
          "id": 4,
          "name": "ThunderCats"
        }
      ]);
    });

    after(() => {
      ProductModel.getAll.restore();
    });

    describe('quando realiza leitura com sucesso', () => {

      it('retorna um array com todos os produtos', async () => {
        const products = await ProductsService.getAll();

        expect(products).to.be.eqls([
          {
            "id": 1,
            "name": "Martelo de Thor"
          },
          {
            "id": 2,
            "name": "Traje de encolhimento"
          },
          {
            "id": 3,
            "name": "Escudo do Capitão América"
          },
          {
            "id": 4,
            "name": "ThunderCats"
          }
        ]);
      });
    });
  });

  describe('quando o nome não é válido', () => {
    describe('quando o nome não existe', () => {
      const error = sendError(400, '"name" is required');

      it('recebe um erro', async () => {
        const product = await ProductsService.createProduct('');

        expect(product).to.be.eqls(error);
      });
    });
    describe('quando o nome tem menos de 5 caracteres', () => {
      const error = sendError(422, '"name" length must be at least 5 characters long');

      it('recebe um erro', async () => {
        const product = await ProductsService.createProduct('ana');

        expect(product).to.be.eqls(error);
      });
    });
  });
});
