const { expect } = require('chai');
const SalesModel = require('../../../models/salesModel');

describe('Testes do endpoit Sales - Camada Model', () => {
  describe('quando a venda é inserido com sucesso camada Model', () => {

    it('possui um array de objetos - camada Model', async () => {

      const response = await SalesModel.findById(2);

      expect(response).to.have.a('array').lengthOf(1);
    })

  })

  describe('quando lê com sucesso as informações do db - camada Sales Model ', () => {

    it('retorna um objeto com todos sales - camada Model', async () => {
      const response = await SalesModel.getAll();

      expect(response).to.be.a('array');
    });

    it('objeto possui o "id" do produto verificado camada Model', async () => {
      const response = await SalesModel.findById(2);

      expect(response).to.be.a('array')
    });

  });

  describe('quando deleta com sucesso as informações do db - camada Sales Model ', () => {

    it('deleta um objeto de sale - camada Model', async () => {
      const response = await SalesModel.deleteSale(1);

      expect(response).to.be.a('object');
    });

  });

});
