const { expect } = require('chai');
const ProductsService = require('../../../services/productsService');

describe('Lê todos os produtos no BD na camada Services', () => {

  describe('quando é lido com sucesso', () => {

    it('retorna um objeto com todos os produtos', async () => {
      const response = await ProductsService.getAll();

      expect(response).to.be.a('array').with.lengthOf(4);
    });

    it('objeto possui o "id" do produto verificado', async () => {
      const response = await ProductsService.findById(1);

      expect(response).to.have.a('object')
    });

  });

  describe('Insere um novo produto no BD', () => {
    const payloadProduct = '';

    describe('quando o payload informado não é válido', () => {
      it('retorna um boolean', async () => {
        const response = await ProductsService.createProduct(payloadProduct);

        expect(response).to.be.a('boolean');
      })

      it('o boolean contém "false"', async () => {
        const response = await ProductsService.createProduct(payloadProduct);

        expect(response).to.be.equal(false);
      })
    })

    describe('quando o payload informado é válido', () => {
      const payloadProduct = 'ThunderCats';

      it('retorna um objeto camada Service', async () => {

        const response = await ProductsService.createProduct(payloadProduct);

        expect(response).to.be.a('object');
      })

      it('o objeto possui o id do novo produto inserido camada Service', async () => {

        const response = await ProductsService.createProduct(payloadProduct);

        expect(response).to.have.a.property('id');
      })
    })

  })
});
