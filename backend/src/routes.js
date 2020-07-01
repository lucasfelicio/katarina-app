const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const Session = require('./controllers/SessionController');
const Venda = require('./controllers/VendaController');
const VendaResumo = require('./controllers/ResumoVendaController');
const Categorias = require('./controllers/CategoriaController');
const Produtos = require('./controllers/ProdutoController');

const routes = express.Router();

routes.get('/sessions', Session.read);
routes.get('/categorias', Categorias.read);
routes.get('/produtos', Produtos.read)
routes.get('/venda', Venda.read);
routes.get('/venda/resumo', VendaResumo.read);

routes.post('/venda', Venda.create);
routes.post('/venda/item', Venda.createItem);

module.exports = routes;