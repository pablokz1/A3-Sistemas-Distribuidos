const db = require('../configs/database');

async function findAll() {
    return new Promise((resolve, reject) => {
        const produtos = [];
        db.each('SELECT * FROM Produtos ORDER BY id', (err, row) => {
            if (err) {
                console.error('Ocorreu um erro ao localizar todos os produtos!');
                reject(err);
            }
            produtos.push(row);
        }, (err, count) => {
            if (err) reject(err);
            resolve(produtos);
        });
    });
}

async function findById(id) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare('SELECT * FROM Produtos WHERE id = ?', [id]);
        stmt.get((err, row) => {
            if (err) {
                console.error('Ocorreu um erro ao localizar produto pelo ID!');
                reject(err);
            }
            resolve(row);
        });
        stmt.finalize();
    });
}

async function insert(produto) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare('INSERT INTO Produtos(nome, descricao, preco) VALUES(?, ?, ?)');
        stmt.bind([produto.nome, produto.descricao, produto.preco]);
        stmt.run(err => {
            if (err) {
                console.error('Ocorreu um erro ao inserir produto!');
                reject(err);
            }
        });
        stmt.finalize();
        const stmt2 = db.prepare('SELECT seq FROM sqlite_sequence WHERE name = "Produtos"');
        stmt2.get((err, row) => {
            resolve(findById(row ? row['seq'] + 1 : 1));
        });  
        stmt2.finalize();    
    });
}

async function update(cliente) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare('UPDATE Produtos SET nome = ?, descricao = ?, preco = ? WHERE id = ?');
        stmt.bind([cliente.nome, cliente.descricao, cliente.preco, cliente.id]);
        stmt.run(err => {
            if (err) {
                console.error('Ocorreu um erro na atualização do produto!');
                reject(err);
            }
            resolve();
        });
        stmt.finalize();
    });
}

async function deleteById(id) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare('DELETE FROM Produtos WHERE id = ?');
        stmt.bind([id]);
        stmt.run(err => {
            if (err) {
                console.error('Ocorreu um erro com ao deletar produto!');
                reject(err);
            }
            resolve();
        });
        stmt.finalize();
   });
}

module.exports = {findAll, findById, insert, update, deleteById};