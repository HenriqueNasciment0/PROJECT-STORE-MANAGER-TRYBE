const { expect } = require('chai');
const sinon = require('sinon');


const SalesController = require('../../../controllers/salesController');
const SalesService = require('../../../services/salesService');

describe('Lê testes de Sales camada Controller', () => {

  describe('Ao chamar o controller de findById', () => {

    describe('quando não existem vendas no banco de dados', async () => {
      const response = {};
      const request = {};

      before(() => {
        request.params = {
          id: 1,
        };

        response.status = sinon.stub()
          .returns(response);
        response.send = sinon.stub()
          .returns();

        sinon.stub(SalesService, 'findById')
          .resolves(null);
      });

      after(() => {
        SalesService.findById.restore();
      });

    });

    describe('quando existem produtos no banco de dados', async () => {
      const response = {};
      const request = {};

      before(() => {
        request.params = {
          id: 1,
        };

        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns();

        sinon.stub(SalesService, 'findById')
          .resolves([
            {
              "date": "2022-07-05T21:08:34.000Z",
              "productId": 1,
              "quantity": 5
            },
            {
              "date": "2022-07-05T21:08:34.000Z",
              "productId": 2,
              "quantity": 10
            }
          ]);
      });

      after(() => {
        SalesService.findById.restore();
      });

      // it('é chamado o método "status" passando o código 200', async () => {
      //   await ProductsController.findById(request, response);

      //   expect(response.status.calledWith(200)).to.be.equal(true);
      // });

      it('é chamado o método "json" passando um objeto', async () => {
        await SalesController.findById(request, response);

        expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
      });
    });

  });
});
