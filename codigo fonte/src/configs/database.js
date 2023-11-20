const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('database.db');

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS Clientes(id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, email TEXT NOT NULL, cpf TEXT)');
    db.run('CREATE TABLE IF NOT EXISTS Produtos(id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, descricao TEXT, preco DECIMAL NOT NULL)');
    db.run('CREATE TABLE IF NOT EXISTS Venda(id INTEGER PRIMARY KEY AUTOINCREMENT, clienteId INTEGER NOT NULL, produtoId INTEGER NOT NULL, data_venda DATE NOT NULL, valor_total TEXT NOT NULL, FOREIGN KEY(clienteId) REFERENCES Clientes(id)), FOREIGN KEY(produtoId) REFERENCES Produtos(id))');
    db.run('CREATE TABLE IF NOT EXISTS Estoque(id INTEGER PRIMARY KEY AUTOINCREMENT, produtoId INTEGER NOT NULL, quantidade_em_estoque INTEGER NOT NULL, quantidade_venda INTEGER NOT NULL, quantidade_baixa_estoque BIT NOT NULL, FOREIGN KEY(produtoId) REFERENCES Produtos(id))');

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
    
    db.run("INSERT OR IGNORE INTO Venda (clienteId, produtoId, data_venda, valor_total) VALUES (1, 2, '2023-11-21', '60.00')");
    db.run("INSERT OR IGNORE INTO Venda (clienteId, produtoId, data_venda, valor_total) VALUES (3, 5, '2023-11-22', '120.00')");
    db.run("INSERT OR IGNORE INTO Venda (clienteId, produtoId, data_venda, valor_total) VALUES (2, 8, '2023-11-23', '180.00')");
    db.run("INSERT OR IGNORE INTO Venda (clienteId, produtoId, data_venda, valor_total) VALUES (4, 3, '2023-11-24', '240.00')");
    db.run("INSERT OR IGNORE INTO Venda (clienteId, produtoId, data_venda, valor_total) VALUES (5, 1, '2023-11-25', '50.00')");
    
    db.run("INSERT OR IGNORE INTO Estoque (produtoId, quantidade_em_estoque, quantidade_venda, quantidade_baixa_estoque) VALUES (1, 100, 10, 0)");
    db.run("INSERT OR IGNORE INTO Estoque (produtoId, quantidade_em_estoque, quantidade_venda, quantidade_baixa_estoque) VALUES (2, 75, 5, 1)");
    db.run("INSERT OR IGNORE INTO Estoque (produtoId, quantidade_em_estoque, quantidade_venda, quantidade_baixa_estoque) VALUES (3, 50, 2, 0)");
    db.run("INSERT OR IGNORE INTO Estoque (produtoId, quantidade_em_estoque, quantidade_venda, quantidade_baixa_estoque) VALUES (4, 120, 8, 1)");
    db.run("INSERT OR IGNORE INTO Estoque (produtoId, quantidade_em_estoque, quantidade_venda, quantidade_baixa_estoque) VALUES (5, 90, 3, 0)");
    db.run("INSERT OR IGNORE INTO Estoque (produtoId, quantidade_em_estoque, quantidade_venda, quantidade_baixa_estoque) VALUES (6, 110, 7, 1)");
    db.run("INSERT OR IGNORE INTO Estoque (produtoId, quantidade_em_estoque, quantidade_venda, quantidade_baixa_estoque) VALUES (7, 60, 4, 0)");
    db.run("INSERT OR IGNORE INTO Estoque (produtoId, quantidade_em_estoque, quantidade_venda, quantidade_baixa_estoque) VALUES (8, 30, 6, 1)");
    db.run("INSERT OR IGNORE INTO Estoque (produtoId, quantidade_em_estoque, quantidade_venda, quantidade_baixa_estoque) VALUES (9, 80, 9, 0)");
    db.run("INSERT OR IGNORE INTO Estoque (produtoId, quantidade_em_estoque, quantidade_venda, quantidade_baixa_estoque) VALUES (10, 95, 1, 1)");

    // -- Atualizando a tabela para definir quantidade_baixa_estoque como true quando a quantidade_em_estoque for inferior a 10
    db.run("UPDATE Estoque SET quantidade_baixa_estoque = 1 WHERE quantidade_em_estoque < 10");
});

module.exports = db;
