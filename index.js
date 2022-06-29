const bodyParser = require('body-parser');
const Product = require('./controllers/storageController');

const app = require('./app');
require('dotenv').config();

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.use(bodyParser.json());

app.get('/products', Product.getAll);

app.get('/products/:id', Product.findById);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
