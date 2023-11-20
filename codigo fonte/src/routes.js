const express = require('express');
const clienteController = require('./controllers/cliente-controller');
const produtoController = require('./controllers/produto-controller');
const estoqueController = require('./controllers/estoque-controller');
const vendaController = require('./controllers/venda-controller');
const relatorioController = require('./controllers/relatorios-controller');

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

routes.get('/estoque', estoqueController.get);
routes.get('/estoque/:id', estoqueController.getById);
routes.post('/estoque', estoqueController.post);
routes.put('/estoque/:id', estoqueController.putById);
routes.delete('/estoque/:id', estoqueController.deleteById);

routes.get('/venda', vendaController.get);
routes.get('/venda/:id', vendaController.getById);
routes.post('/venda', vendaController.post);
routes.put('/venda/:id', vendaController.putById);
routes.delete('/venda/:id', vendaController.deleteById);

routes.get('/relatorio/produtosMaisVendidos', relatorioController.getByProdutosMaisVendidos);
routes.get('/relatorio/produtosPorCliente', relatorioController.getByProdutosPorCliente);
routes.get('/relatorio/consumoCliente', relatorioController.getByConsumoCliente);
routes.get('/relatorio/estoqueBaixo', relatorioController.getByEstoqueBaixo);

module.exports = routes;