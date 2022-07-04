const bodyParser = require('body-parser');
const Product = require('./controllers/productsController');
const Sales = require('./controllers/salesController');
const customError = require('./middlewares/customError');

const app = require('./app');
require('dotenv').config();

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.use(bodyParser.json());

app.get('/products', Product.getAll);

app.get('/products/:id', Product.findById);

app.post('/products', Product.createProduct);

app.post('/sales', Sales.createSales);

app.use(customError);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
