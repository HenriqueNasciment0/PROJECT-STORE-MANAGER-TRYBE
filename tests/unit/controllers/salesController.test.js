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
        request.body = [
          {
            "productId": 1,
            "quantity": 1
          },
          {
            "productId": 2,
            "quantity": 5
          }
        ];

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(SalesService, 'createSales').resolves({
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

      })

      after(() => {
        SalesService.createSales.restore();
      })

      it('é chamado com o código 201', async () => {
        await SalesController.createSales(request, response);

        expect(response.status.calledWith(201)).to.be.equal(true);
      })

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

      it('é chamado o método "json" passando um objeto', async () => {
        await SalesController.findById(request, response);

        expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
      });
    });

    describe('quando uma venda é deletada no banco de dados', async () => {
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
          .resolves('');
      });

      after(() => {
        SalesService.findById.restore();
      });

      it('é chamado o método "json" passando vazio', async () => {
        await SalesController.findById(request, response);

        expect(response.json.calledWith(sinon.match.any)).to.be.equal(true);
      });

    });

  });
});
