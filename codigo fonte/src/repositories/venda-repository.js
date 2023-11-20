const db = require('../configs/database');

async function findAll() {
    return new Promise((resolve, reject) => {
        const venda = [];
        db.each('SELECT * FROM Venda ORDER BY id', (err, row) => {
            if (err) {
                console.error('Ocorreu um erro ao localizar a venda!');
                reject(err);
            }
            venda.push(row);
        }, (err, count) => {
            if (err) reject(err);
            resolve(venda);
        });
    });
}

async function findById(id) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare('SELECT * FROM Venda WHERE id = ?', [id]);
        stmt.get((err, row) => {
            if (err) {
                console.error('Ocorreu um erro ao localizar venda pelo ID!');
                reject(err);
            }
            resolve(row);
        });
        stmt.finalize();
    });
}

async function insert(venda) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare('INSERT INTO Venda(clienteId, produtoId, data_venda, quantidade_produtos_vendidos, valor_total) VALUES(?, ?, ?, ?, ?)');
        stmt.bind([venda.clienteId, venda.produtoId, venda.data_venda, venda.quantidade_produtos_vendidos, venda.valor_total]);
        stmt.run(err => {
            if (err) {
                console.error('Ocorreu um erro ao inserir venda!');
                reject(err);
            }
        });
        stmt.finalize();
        const stmt2 = db.prepare('SELECT seq FROM sqlite_sequence WHERE name = "Venda"');
        stmt2.get((err, row) => {
            resolve(findById(row ? row['seq'] + 1 : 1));
        });  
        stmt2.finalize();    
    });
}

async function update(venda) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare('UPDATE Venda SET clienteId = ?, produtoId = ?, data_venda = ?, quantidade_produtos_vendidos = ?, valor_total = ? WHERE id = ?');
        stmt.bind([venda.clienteId, venda.produtoId, venda.data_venda, venda.quantidade_produtos_vendidos, venda.valor_total, venda.id]);
        stmt.run(err => {
            if (err) {
                console.error('Ocorreu um erro na atualização do venda!');
                reject(err);
            }
            resolve();
        });
        stmt.finalize();
    });
}

async function deleteById(id) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare('DELETE FROM Venda WHERE id = ?');
        stmt.bind([id]);
        stmt.run(err => {
            if (err) {
                console.error('Ocorreu um erro com ao deletar venda!');
                reject(err);
            }
            resolve();
        });
        stmt.finalize();
   });
}

module.exports = {findAll, findById, insert, update, deleteById};