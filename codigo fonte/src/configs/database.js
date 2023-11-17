const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('database.db');

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS Cliente(id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, email TEXT NOT NULL, cpf TEXT)');
    db.run('CREATE TABLE IF NOT EXISTS Produto(id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, descricao TEXT, preco DECIMAL NOT NULL, quantidade_em_estoque INTEGER NOT NULL)');
    db.run('CREATE TABLE IF NOT EXISTS Venda(id INTEGER PRIMARY KEY AUTOINCREMENT, clienteId INTEGER NOT NULL, data_venda DATE NOT NULL, FOREIGN KEY(clienteId) REFERENCES Cliente(id))');
    db.run('CREATE TABLE IF NOT EXISTS ItemVenda(id INTEGER PRIMARY KEY AUTOINCREMENT, vendaId INTEGER NOT NULL, produtoId INTEGER NOT NULL, quantidade INTEGER NOT NULL, preco_unitario DECIMAL NOT NULL, FOREIGN KEY(vendaId) REFERENCES Venda(id), FOREIGN KEY(produtoId) REFERENCES Produto(id))');
    db.run('CREATE TABLE IF NOT EXISTS PedidoCompra(id INTEGER PRIMARY KEY AUTOINCREMENT, fornecedorId INTEGER, data_pedido DATE NOT NULL, FOREIGN KEY(fornecedorId) REFERENCES Fornecedor(id))');
    db.run('CREATE TABLE IF NOT EXISTS ItemPedidoCompra(id INTEGER PRIMARY KEY AUTOINCREMENT, pedidoCompraId INTEGER NOT NULL, produtoId INTEGER NOT NULL, quantidade INTEGER NOT NULL, preco_unitario DECIMAL NOT NULL, FOREIGN KEY(pedidoCompraId) REFERENCES PedidoCompra(id), FOREIGN KEY(produtoId) REFERENCES Produto(id))');

    db.run("INSERT OR IGNORE INTO Cliente (id, nome, email, cpf) VALUES (1, 'João Silva', 'joao@example.com', '123.456.789-00')");
    db.run("INSERT OR IGNORE INTO Cliente (id, nome, email, cpf) VALUES (2, 'Maria Oliveira', 'maria@example.com', '987.654.321-00')");
    db.run("INSERT OR IGNORE INTO Cliente (id, nome, email, cpf) VALUES (3, 'Carlos Santos', 'carlos@example.com', '111.222.333-44')");
    db.run("INSERT OR IGNORE INTO Cliente (id, nome, email, cpf) VALUES (4, 'Ana Souza', 'ana@example.com', '555.666.777-88')");
    db.run("INSERT OR IGNORE INTO Cliente (id, nome, email, cpf) VALUES (5, 'Pedro Pereira', 'pedro@example.com', '999.888.777-66')");

    db.run("INSERT OR IGNORE INTO Produto (id, nome, descricao, preco, quantidade_em_estoque) VALUES (1, 'Produto A', 'Descrição do Produto A', 50.00, 100)");
    db.run("INSERT OR IGNORE INTO Produto (id, nome, descricao, preco, quantidade_em_estoque) VALUES (2, 'Produto B', 'Descrição do Produto B', 30.00, 75)");
    db.run("INSERT OR IGNORE INTO Produto (id, nome, descricao, preco, quantidade_em_estoque) VALUES (3, 'Produto C', 'Descrição do Produto C', 80.00, 50)");
    db.run("INSERT OR IGNORE INTO Produto (id, nome, descricao, preco, quantidade_em_estoque) VALUES (4, 'Produto D', 'Descrição do Produto D', 25.00, 120)");
    db.run("INSERT OR IGNORE INTO Produto (id, nome, descricao, preco, quantidade_em_estoque) VALUES (5, 'Produto E', 'Descrição do Produto E', 60.00, 90)");
    db.run("INSERT OR IGNORE INTO Produto (id, nome, descricao, preco, quantidade_em_estoque) VALUES (6, 'Produto F', 'Descrição do Produto F', 45.00, 110)");
    db.run("INSERT OR IGNORE INTO Produto (id, nome, descricao, preco, quantidade_em_estoque) VALUES (7, 'Produto G', 'Descrição do Produto G', 70.00, 60)");
    db.run("INSERT OR IGNORE INTO Produto (id, nome, descricao, preco, quantidade_em_estoque) VALUES (8, 'Produto H', 'Descrição do Produto H', 90.00, 30)");
    db.run("INSERT OR IGNORE INTO Produto (id, nome, descricao, preco, quantidade_em_estoque) VALUES (9, 'Produto I', 'Descrição do Produto I', 55.00, 80)");
    db.run("INSERT OR IGNORE INTO Produto (id, nome, descricao, preco, quantidade_em_estoque) VALUES (10, 'Produto J', 'Descrição do Produto J', 40.00, 95)");

    db.run("INSERT OR IGNORE INTO Venda (id, clienteId, data_venda) VALUES (1, 1, '2023-01-01')");
    db.run("INSERT OR IGNORE INTO Venda (id, clienteId, data_venda) VALUES (2, 2, '2023-01-02')");
    db.run("INSERT OR IGNORE INTO Venda (id, clienteId, data_venda) VALUES (3, 3, '2023-01-03')");
    db.run("INSERT OR IGNORE INTO Venda (id, clienteId, data_venda) VALUES (4, 4, '2023-01-04')");
    db.run("INSERT OR IGNORE INTO Venda (id, clienteId, data_venda) VALUES (5, 5, '2023-01-05')");

    db.run("INSERT OR IGNORE INTO ItemVenda (id, vendaId, produtoId, quantidade, preco_unitario) VALUES (1, 1, 1, 2, 50.00)");
    db.run("INSERT OR IGNORE INTO ItemVenda (id, vendaId, produtoId, quantidade, preco_unitario) VALUES (2, 2, 3, 1, 80.00)");
    db.run("INSERT OR IGNORE INTO ItemVenda (id, vendaId, produtoId, quantidade, preco_unitario) VALUES (3, 3, 5, 3, 60.00)");
    db.run("INSERT OR IGNORE INTO ItemVenda (id, vendaId, produtoId, quantidade, preco_unitario) VALUES (4, 4, 2, 5, 30.00)");
    db.run("INSERT OR IGNORE INTO ItemVenda (id, vendaId, produtoId, quantidade, preco_unitario) VALUES (5, 5, 4, 4, 25.00)");

    db.run("INSERT OR IGNORE INTO PedidoCompra (id, fornecedorId, data_pedido) VALUES (1, 1, '2023-02-01')");
    db.run("INSERT OR IGNORE INTO PedidoCompra (id, fornecedorId, data_pedido) VALUES (2, 2, '2023-02-02')");
    db.run("INSERT OR IGNORE INTO PedidoCompra (id, fornecedorId, data_pedido) VALUES (3, 3, '2023-02-03')");

    db.run("INSERT OR IGNORE INTO ItemPedidoCompra (id, pedidoCompraId, produtoId, quantidade, preco_unitario) VALUES (1, 1, 6, 10, 40.00)");
    db.run("INSERT OR IGNORE INTO ItemPedidoCompra (id, pedidoCompraId, produtoId, quantidade, preco_unitario) VALUES (2, 2, 8, 8, 35.00)");
    db.run("INSERT OR IGNORE INTO ItemPedidoCompra (id, pedidoCompraId, produtoId, quantidade, preco_unitario) VALUES (3, 3, 10, 12, 50.00)");
    
});

module.exports = db;
