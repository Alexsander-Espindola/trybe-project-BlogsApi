const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const usersController = require('./controllers/usersController');
const loginController = require('./controllers/loginController');
const error = require('./middlewares/errorMiddleware');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/user', usersController);
app.use('/login', loginController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));
app.use(error);
