const db = require('../configs/database');

const produtosMaisVendidos = 'SELECT Produto.nome AS Produto,SUM(Venda.quantidade_produtos_vendidos) AS QuantidadeTotalVendida FROM Venda JOIN Produto ON Venda.produtoId = Produto.id GROUP BY Produto.nome ORDER BY QuantidadeTotalVendida DESC';
const produtosPorClientes = 'SELECT C.nome AS NomeCliente, P.nome AS NomeProduto, V.quantidade_produtos_vendidos AS QuantidadeComprada FROM Venda V JOIN Cliente C ON V.clienteId = C.id JOIN Produto P ON V.produtoId = P.id';
const consumoCliente = 'SELECT Cliente.id AS ClienteID, Cliente.nome AS ClienteNome, AVG(Venda.valor_total) AS ConsumoMedio FROM Cliente JOIN Venda ON Cliente.id = Venda.clienteId GROUP BY Cliente.id, Cliente.nome ORDER BY ConsumoMedio DESC';
const baixoEstoque = 'SELECT Produto.nome AS NomeProduto, Estoque.quantidade_em_estoque AS QuantidadeEmEstoque FROM Produto JOIN Estoque ON Produto.id = Estoque.produtoId WHERE Estoque.quantidade_em_estoque < 50';

async function findByProdutosMaisVendidos() {
    return new Promise((resolve, reject) => {
        const venda = [];
        db.each(produtosMaisVendidos, (err, row) => {
            if (err) {
                console.error('Ocorreu um erro ao localizar os produtos mais vendidos!');
                reject(err);
            }
            venda.push(row);
        }, (err, count) => {
            if (err) reject(err);
            resolve(venda);
        });
    });
}

async function findByProdutosPorCliente() {
    return new Promise((resolve, reject) => {
        const venda = [];
        db.each(produtosPorClientes, (err, row) => {
            if (err) {
                console.error('Ocorreu um erro ao localizar os produtos por cliente!');
                reject(err);
            }
            venda.push(row);
        }, (err, count) => {
            if (err) reject(err);
            resolve(venda);
        });
    });
}

async function findByConsumoCliente() {
    return new Promise((resolve, reject) => {
        const venda = [];
        db.each(consumoCliente, (err, row) => {
            if (err) {
                console.error('Ocorreu um erro ao localizar os produtos pelo consumo do cliente!');
                reject(err);
            }
            venda.push(row);
        }, (err, count) => {
            if (err) reject(err);
            resolve(venda);
        });
    });
}

async function findByEstoqueBaixo() {
    return new Promise((resolve, reject) => {
        const venda = [];
        db.each(baixoEstoque, (err, row) => {
            if (err) {
                console.error('Ocorreu um erro ao localizar os produtos com baixo estoque!');
                reject(err);
            }
            venda.push(row);
        }, (err, count) => {
            if (err) reject(err);
            resolve(venda);
        });
    });
}

module.exports = {findByProdutosMaisVendidos, findByProdutosPorCliente, findByConsumoCliente, findByEstoqueBaixo};