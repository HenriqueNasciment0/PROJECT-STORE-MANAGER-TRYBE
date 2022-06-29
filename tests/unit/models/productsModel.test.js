const { expect } = require('chai');
const ProductsModel = require('../../../models/productsModel');

describe('Lê todos os produtos no BD', () => {

  describe('quando é lido com sucesso', () => {

    it('retorna um objeto com todos os produtos', async () => {
      const response = await ProductsModel.getAll();

      expect(response).to.be.a('array').with.lengthOf(3);
    });

    it('objeto possui o "id" do produto verificado', async () => {
      const response = await ProductsModel.findById(1);

      expect(response).to.have.a('object')
    });

  });
});
