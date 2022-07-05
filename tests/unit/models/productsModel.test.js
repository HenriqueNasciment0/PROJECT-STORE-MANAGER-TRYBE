const { expect } = require('chai');
const ProductsModel = require('../../../models/productsModel');

describe('Lê todos os produtos no BD', () => {

  describe('quando é lido com sucesso', () => {

    it('retorna um objeto com todos os produtos camada Model', async () => {
      const response = await ProductsModel.getAll();

      expect(response).to.be.a('array').with.lengthOf(3);
    });

    it('objeto possui o "id" do produto verificado camada Model', async () => {
      const response = await ProductsModel.findById(1);

      expect(response).to.have.a.property('id')
    });

  });

  describe('Insere um novo produto camada Model', () => {

    const payloadProduct = 'ThunderCats';


    describe('quando o produto é inserido com sucesso camada Model', () => {

      it('retorna um objeto camada Model', async () => {

        const response = await ProductsModel.createProduct(payloadProduct);

        expect(response).to.be.a('array').with.lengthOf(1);
      })

      it('o objeto possui o id do novo produto inserido camada Model', async () => {

        const response = await ProductsModel.findById(4);

        expect(response).to.have.a('object');
      })

   })

  })
});
