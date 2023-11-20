const relatorioRepository = require('../repositories/relatorios-repository');


async function getByProdutosMaisVendidos(req, res) {
    const produtosMaisVendidos = await relatorioRepository.findByProdutosMaisVendidos();
    res.json(produtosMaisVendidos);
}

async function getByProdutosPorCliente(req, res) {
    const produtosPorClientes = await relatorioRepository.findByProdutosPorCliente();
    res.json(produtosPorClientes);
}

async function getByConsumoCliente(req, res) {
    const consumoCliente = await relatorioRepository.findByConsumoCliente();
    res.json(consumoCliente);
}

async function getByEstoqueBaixo(req, res) {
    const baixoEstoque = await relatorioRepository.findByEstoqueBaixo();
    res.json(baixoEstoque);
}

module.exports = { getByProdutosMaisVendidos, getByProdutosPorCliente, getByConsumoCliente, getByEstoqueBaixo};