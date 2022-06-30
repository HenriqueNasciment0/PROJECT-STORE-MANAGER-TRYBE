const { expect } = require('chai');
const sinon = require('sinon');


const ProductsController = require('../../../controllers/productsController');
const ProductsService = require('../../../services/productsService');

describe('Verifica o código de status e se a mensagem foi enviada caso um produto não exista', () => {

  describe('Ao chamar o controller de findById', () => {

    describe('quando não existem produtos no banco de dados', async () => {
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

        sinon.stub(ProductsService, 'findById')
          .resolves(null);
      });

      after(() => {
        ProductsService.findById.restore();
      });

      // it('é chamado o método "status" passando 404', async () => {
      //   await ProductsController.findById(request, response);

      //   expect(response.status.calledWith(404)).to.be.equal(true);
      // });

      // it('é chamado o método "send" passando a mensagem "Product not found"', async () => {
      //   await ProductsController.findById(request, response);

      //   expect(response.send.calledWith('Product not found')).to.be.equal(true);
      // });

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

      sinon.stub(ProductsService, 'findById')
        .resolves({
          id: 1,
          name: "Martelo de Thor",
        });
    });

    after(() => {
      ProductsService.findById.restore();
    });

    // it('é chamado o método "status" passando o código 200', async () => {
    //   await ProductsController.findById(request, response);

    //   expect(response.status.calledWith(200)).to.be.equal(true);
    // });

    it('é chamado o método "json" passando um objeto', async () => {
      await ProductsController.findById(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });

  describe('quando o payload informado é válido', () => {

      const request = {}
      const response = {}

      before(() => {
        request.body = 'Homem Areia';

        response.status = sinon.stub().returns(response);
        response.send = sinon.stub().returns();

        sinon.stub(ProductsService, 'createProduct').resolves(true);

      })

    after(() => {
      ProductsService.createProduct.restore();
      })

      // it('é chamado com o código 201', async () => {
      //   await ProductsController.createProduct(request, response);

      //   expect(response.status.calledWith(201)).to.be.equal(true);
      // })

  })

})
