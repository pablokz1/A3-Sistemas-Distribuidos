const db = require('../configs/database');

async function findAll() {
    return new Promise((resolve, reject) => {
        const estoque = [];
        db.each('SELECT * FROM Estoque ORDER BY id', (err, row) => {
            if (err) {
                console.error('Ocorreu um erro ao localizar todos os portutos em estoque!');
                reject(err);
            }
            estoque.push(row);
        }, (err, count) => {
            if (err) reject(err);
            resolve(estoque);
        });
    });
}

async function findById(id) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare('SELECT * FROM Estoque WHERE id = ?', [id]);
        stmt.get((err, row) => {
            if (err) {
                console.error('Ocorreu um erro ao localizar estoque pelo ID!');
                reject(err);
            }
            resolve(row);
        });
        stmt.finalize();
    });
}

async function findByProdutoId(id) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare('SELECT * FROM Estoque WHERE produtoId = ?', [id]);
        stmt.get((err, row) => {
            if (err) {
                console.error('Ocorreu um erro ao localizar estoque pelo ID!');
                reject(err);
            }
            resolve(row);
        });
        stmt.finalize();
    });
}

async function insert(estoque) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare('INSERT INTO Estoque(produtoId, quantidade_em_estoque, quantidade_venda, quantidade_baixa_estoque) VALUES(?, ?, ?, ?)');
        stmt.bind([estoque.produtoId, estoque.quantidade_em_estoque, estoque.quantidade_venda, estoque.quantidade_baixa_estoque]);
        stmt.run(err => {
            if (err) {
                console.error('Ocorreu um erro ao inserir estoque!');
                reject(err);
            }
        });
        stmt.finalize();
        const stmt2 = db.prepare('SELECT seq FROM sqlite_sequence WHERE name = "Estoque"');
        stmt2.get((err, row) => {
            resolve(findById(row ? row['seq'] + 1 : 1));
        });  
        stmt2.finalize();    
    });
}

async function update(estoque) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare('UPDATE Estoque SET produtoId = ?, quantidade_em_estoque = ?, quantidade_venda = ?, quantidade_baixa_estoque = ? WHERE id = ?');
        stmt.bind([estoque.produtoId, estoque.quantidade_em_estoque, estoque.quantidade_venda, estoque.quantidade_baixa_estoque, estoque.id]);
        stmt.run(err => {
            if (err) {
                console.error('Ocorreu um erro na atualização do estoque!');
                reject(err);
            }
            resolve();
        });
        stmt.finalize();
    });
}

async function updateQuantidadeProduto(id, qtdVendida) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare('UPDATE Estoque SET quantidade_em_estoque = (quantidade_em_estoque - ?), quantidade_venda = (quantidade_venda + ?) WHERE produtoId = ?');
        stmt.bind([qtdVendida, qtdVendida, id]);
        stmt.run(err => {
            if (err) {
                console.error('Ocorreu um erro na atualização do estoque!');
                reject(err);
            }
            resolve();
        });
        stmt.finalize();
    });
}

async function deleteById(id) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare('DELETE FROM Estoque WHERE id = ?');
        stmt.bind([id]);
        stmt.run(err => {
            if (err) {
                console.error('Ocorreu um erro com ao deletar estoque!');
                reject(err);
            }
            resolve();
        });
        stmt.finalize();
   });
}

module.exports = {findAll, findById, findByProdutoId, insert, update, updateQuantidadeProduto, deleteById};