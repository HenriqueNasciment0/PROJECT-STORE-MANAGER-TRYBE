const { expect } = require('chai');
const ProductsService = require('../../../services/productsService');

describe('Lê todos os produtos no BD na camada Services', () => {

  describe('quando é lido com sucesso', () => {

    it('retorna um objeto com todos os produtos', async () => {
      const response = await ProductsService.getAll();

      expect(response).to.be.a('array').with.lengthOf(3);
    });

    it('objeto possui o "id" do produto verificado', async () => {
      const response = await ProductsService.findById(1);

      expect(response).to.have.a('object')
    });

  });
});
