const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const cors = require('cors');

//Iniciando o App
const app = express();
app.use(express.json());
app.use(cors());

//Iniciando o DB
mongoose.connect('mongodb://localhost/noderest', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

requireDir('./src/models');

require('./src/controllers/UserController')(app);
require('./src/controllers/ProjectController')(app);
require('./src/controllers/RecipeController')(app);

//req é a requisição. Sempre que vc dá um f5 na page, você está fazendo uma requisição
//res é a resposta da requisição

app.listen(process.env.PORT || 3334);
