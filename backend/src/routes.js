const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const Session = require('./controllers/SessionController');
const Venda = require('./controllers/VendaController');
const VendaResumo = require('./controllers/ResumoVendaController');
const Categorias = require('./controllers/CategoriaController');
const Produtos = require('./controllers/ProdutoController');
const Opcionais = require('./controllers/OpcionalController');

const routes = express.Router();

routes.get('/sessions', Session.create);
routes.get('/categorias', Categorias.read);
routes.get('/produtos', Produtos.read)
routes.get('/opcionais', Opcionais.read)
routes.get('/venda', Venda.read);
routes.get('/venda/resumo', VendaResumo.read);

routes.post('/venda', Venda.create);

routes.post('/venda/item', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    id_empresa: Joi.number(),
    id_venda: Joi.number(),
    id_produto: Joi.number(),
    quantidade: Joi.number(),
    valor_unit: Joi.number(),
    valor_total: Joi.number(),
    observacao: Joi.string(),
    id_impressora: Joi.number()
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown()
}), Venda.createItem);

module.exports = routes;