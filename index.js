const bodyParser = require('body-parser');
const Product = require('./controllers/productsController');

const app = require('./app');
require('dotenv').config();

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.use(bodyParser.json());

app.get('/products', Product.getAll);

app.get('/products/:id', Product.findById);

app.post('/products', Product.createProduct);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
