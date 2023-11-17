const express = require('express');
const clienteController = require('./controllers/cliente-controller');

const routes = express();

routes.get('/clientes', clienteController.get);
routes.get('/clientes/:id', clienteController.getById);
routes.post('/clientes', clienteController.post);
routes.put('/clientes/:id', clienteController.putById);
routes.delete('/clientes/:id', clienteController.deleteById);

module.exports = routes;