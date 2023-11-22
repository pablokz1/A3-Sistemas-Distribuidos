const db = require('../configs/database');

async function findAll() {
    return new Promise((resolve, reject) => {
        const clientes = [];
        db.each('SELECT * FROM Cliente ORDER BY id', (err, row) => {
            if (err) {
                console.error('Ocorreu um erro ao localizar todos os clientes!');
                reject(err);
            }
            clientes.push(row);
        }, (err, count) => {
            if (err) reject(err);
            resolve(clientes);
        });
    });
}

async function findById(id) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare('SELECT * FROM Cliente WHERE id = ?', [id]);
        stmt.get((err, row) => {
            if (err) {
                console.error('Ocorreu um erro ao localizar cliente pelo ID!');
                reject(err);
            }
            resolve(row);
        });
        stmt.finalize();
    });
}

async function findByEmail(email) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare('SELECT * FROM Cliente WHERE email = ?', [email]);
        stmt.get((err, row) => {
            if (err) {
                console.error('Ocorreu um erro ao localizar cliente pelo e-mail!');
                reject(err);
            }
            resolve(row);
        });
        stmt.finalize();
    });
}

async function findByCpf(cpf) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare('SELECT * FROM Cliente WHERE cpf = ?', [cpf]);
        stmt.get((err, row) => {
            if (err) {
                console.error('Ocorreu um erro ao localizar cliente pelo cpf');
                reject(err);
            }
            resolve(row);
        });
        stmt.finalize();
    });
}

async function insert(cliente) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare('INSERT INTO Cliente(nome, email, cpf) VALUES(?, ?, ?)');
        stmt.bind([cliente.nome, cliente.email, cliente.cpf]);
        stmt.run(err => {
            if (err) {
                console.error('Ocorreu um erro ao inserir cliente!');
                reject(err);
            }
        });
        stmt.finalize();
        const stmt2 = db.prepare('SELECT seq FROM sqlite_sequence WHERE name = "Cliente"');
        stmt2.get((err, row) => {
            resolve(findById(row ? row['seq'] + 1 : 1));
        });  
        stmt2.finalize();    
    });
}

async function update(cliente) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare('UPDATE Cliente SET nome = ?, email = ?, cpf = ? WHERE id = ?');
        stmt.bind([cliente.nome, cliente.email, cliente.cpf, cliente.id]);
        stmt.run(err => {
            if (err) {
                console.error('Ocorreu um erro na atualização do cliente!');
                reject(err);
            }
            resolve();
        });
        stmt.finalize();
    });
}

async function deleteById(id) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare('DELETE FROM Cliente WHERE id = ?');
        stmt.bind([id]);
        stmt.run(err => {
            if (err) {
                console.error('Ocorreu um erro com ao deletar cliente!');
                reject(err);
            }
            resolve();
        });
        stmt.finalize();
   });
}

module.exports = {findAll, findById, findByEmail, findByCpf, insert, update, deleteById};