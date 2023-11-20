const express = require('express');
const clienteController = require('./controllers/cliente-controller');
const produtoController = require('./controllers/produto-controller');

const routes = express();

routes.get('/clientes', clienteController.get);
routes.get('/clientes/:id', clienteController.getById);
routes.post('/clientes', clienteController.post);
routes.put('/clientes/:id', clienteController.putById);
routes.delete('/clientes/:id', clienteController.deleteById);

routes.get('/produtos', produtoController.get);
routes.get('/produtos/:id', produtoController.getById);
routes.post('/produtos', produtoController.post);
routes.put('/produtos/:id', produtoController.putById);
routes.delete('/produtos/:id', produtoController.deleteById);

module.exports = routes;