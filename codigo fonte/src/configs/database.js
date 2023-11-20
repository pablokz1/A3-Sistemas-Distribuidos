const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('database.db');

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS Cliente(id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, email TEXT NOT NULL, cpf TEXT)');
    db.run('CREATE TABLE IF NOT EXISTS Produto(id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, descricao TEXT, preco DECIMAL NOT NULL)');
    db.run('CREATE TABLE IF NOT EXISTS Venda(id INTEGER PRIMARY KEY AUTOINCREMENT, clienteId INTEGER NOT NULL, produtoId INTEGER NOT NULL, data_venda DATE NOT NULL, quantidade_produtos_vendidos INTEGER NOT NULL, valor_total TEXT NOT NULL, FOREIGN KEY(clienteId) REFERENCES Cliente(id) FOREIGN KEY(produtoId) REFERENCES Produto(id))');
    db.run('CREATE TABLE IF NOT EXISTS Estoque(id INTEGER PRIMARY KEY AUTOINCREMENT, produtoId INTEGER NOT NULL, quantidade_em_estoque INTEGER NOT NULL, quantidade_venda INTEGER NOT NULL, FOREIGN KEY(produtoId) REFERENCES Produto(id))');

    db.run("INSERT OR IGNORE INTO Cliente (id, nome, email, cpf) VALUES (1, 'João Silva', 'joao@example.com', '123.456.789-00')");
    db.run("INSERT OR IGNORE INTO Cliente (id, nome, email, cpf) VALUES (2, 'Maria Oliveira', 'maria@example.com', '987.654.321-00')");
    db.run("INSERT OR IGNORE INTO Cliente (id, nome, email, cpf) VALUES (3, 'Carlos Santos', 'carlos@example.com', '111.222.333-44')");
    db.run("INSERT OR IGNORE INTO Cliente (id, nome, email, cpf) VALUES (4, 'Ana Souza', 'ana@example.com', '555.666.777-88')");
    db.run("INSERT OR IGNORE INTO Cliente (id, nome, email, cpf) VALUES (5, 'Pedro Pereira', 'pedro@example.com', '999.888.777-66')");

    db.run("INSERT OR IGNORE INTO Produto (id, nome, descricao, preco) VALUES (1, 'Produto A', 'Descrição do Produto A', 50.00)");
    db.run("INSERT OR IGNORE INTO Produto (id, nome, descricao, preco) VALUES (2, 'Produto B', 'Descrição do Produto B', 30.00)");
    db.run("INSERT OR IGNORE INTO Produto (id, nome, descricao, preco) VALUES (3, 'Produto C', 'Descrição do Produto C', 80.00)");
    db.run("INSERT OR IGNORE INTO Produto (id, nome, descricao, preco) VALUES (4, 'Produto D', 'Descrição do Produto D', 25.00)");
    db.run("INSERT OR IGNORE INTO Produto (id, nome, descricao, preco) VALUES (5, 'Produto E', 'Descrição do Produto E', 60.00)");
    db.run("INSERT OR IGNORE INTO Produto (id, nome, descricao, preco) VALUES (6, 'Produto F', 'Descrição do Produto F', 45.00)");
    db.run("INSERT OR IGNORE INTO Produto (id, nome, descricao, preco) VALUES (7, 'Produto G', 'Descrição do Produto G', 70.00)");
    db.run("INSERT OR IGNORE INTO Produto (id, nome, descricao, preco) VALUES (8, 'Produto H', 'Descrição do Produto H', 90.00)");
    db.run("INSERT OR IGNORE INTO Produto (id, nome, descricao, preco) VALUES (9, 'Produto I', 'Descrição do Produto I', 55.00)");
    db.run("INSERT OR IGNORE INTO Produto (id, nome, descricao, preco) VALUES (10, 'Produto J', 'Descrição do Produto J', 40.0)");
    
    db.run("INSERT OR IGNORE INTO Venda (id, clienteId, produtoId, data_venda, quantidade_produtos_vendidos, valor_total) VALUES (1, 1, 2, '2023-11-21', 2, '60.00')");
    db.run("INSERT OR IGNORE INTO Venda (id, clienteId, produtoId, data_venda, quantidade_produtos_vendidos, valor_total) VALUES (2, 3, 5, '2023-11-22', 2, '120.00')");
    db.run("INSERT OR IGNORE INTO Venda (id, clienteId, produtoId, data_venda, quantidade_produtos_vendidos, valor_total) VALUES (3, 2, 8, '2023-11-23', 2, '180.00')");
    db.run("INSERT OR IGNORE INTO Venda (id, clienteId, produtoId, data_venda, quantidade_produtos_vendidos, valor_total) VALUES (4, 4, 3, '2023-11-24', 4, '240.00')");
    db.run("INSERT OR IGNORE INTO Venda (id, clienteId, produtoId, data_venda, quantidade_produtos_vendidos, valor_total) VALUES (5, 5, 1, '2023-11-25', 1, '50.00')");
    
    db.run("INSERT OR IGNORE INTO Estoque (id, produtoId, quantidade_em_estoque, quantidade_venda) VALUES (1, 1, 100, 10)");
    db.run("INSERT OR IGNORE INTO Estoque (id, produtoId, quantidade_em_estoque, quantidade_venda) VALUES (2, 2, 75, 5)");
    db.run("INSERT OR IGNORE INTO Estoque (id, produtoId, quantidade_em_estoque, quantidade_venda) VALUES (3, 3, 50, 2)");
    db.run("INSERT OR IGNORE INTO Estoque (id, produtoId, quantidade_em_estoque, quantidade_venda) VALUES (4, 4, 120, 8)");
    db.run("INSERT OR IGNORE INTO Estoque (id, produtoId, quantidade_em_estoque, quantidade_venda) VALUES (5, 5, 90, 3)");
    db.run("INSERT OR IGNORE INTO Estoque (id, produtoId, quantidade_em_estoque, quantidade_venda) VALUES (6, 6, 110, 7)");
    db.run("INSERT OR IGNORE INTO Estoque (id, produtoId, quantidade_em_estoque, quantidade_venda) VALUES (7, 7, 60, 4)");
    db.run("INSERT OR IGNORE INTO Estoque (id, produtoId, quantidade_em_estoque, quantidade_venda) VALUES (8, 8, 30, 6)");
    db.run("INSERT OR IGNORE INTO Estoque (id, produtoId, quantidade_em_estoque, quantidade_venda) VALUES (9, 9, 80, 9)");
    db.run("INSERT OR IGNORE INTO Estoque (id, produtoId, quantidade_em_estoque, quantidade_venda) VALUES (10, 10, 95, 1)");

});

module.exports = db;
