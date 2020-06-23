const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const Session = require('./controllers/SessionController');
const Vendas = require('./controllers/VendaController');

const routes = express.Router();

routes.get('/sessions', Session.create);
routes.get('/vendas', Vendas.read);


// routes.get('/ongs', OngController.index);
// routes.post('/ongs', celebrate({
//     [Segments.QUERY]: Joi.object().keys({
//         name: Joi.string().required(),
//         email: Joi.string().required().email(),
//         whatsapp: Joi.string().required().min(10).max(11),
//         city: Joi.string().required(),
//         uf: Joi.string().required().length(2),
//     })
// }), OngController.create);
// routes.get('/profile', celebrate({
//     [Segments.HEADERS]: Joi.object({
//         authorization: Joi.string().required(),
//     }).unknown(),
// }), ProfileController.index);
// routes.get('/incidents', celebrate({
//     [Segments.QUERY]: Joi.object().keys({
//         page: Joi.number(),
//     })
// }), IncidentController.index);

// routes.post('/incidents', IncidentController.create);

// routes.delete('/incidents/:id', celebrate({
//     [Segments.PARAMS]: Joi.object().keys({
//         id: Joi.number().required(),
//     })
// }), IncidentController.delete);

module.exports = routes;