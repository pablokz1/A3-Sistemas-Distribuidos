const produtoRepository = require('../repositories/produto-repository');


async function get(req, res) {
    const produtos = await produtoRepository.findAll();
    res.json(produtos);
}

async function getById(req, res) {
    const produto = await produtoRepository.findById(req.params.id);
    res.json(produto);
}

async function post(req, res) {
    try {
        const produto = await produtoRepository.insert(req.body);
        res.status(201).json(produto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro do Servidor Interno.' });
    }
}

async function putById(req, res) {
    const produto = await produtoRepository.findById(req.params.id);
    if (!produto) {
        res.status(404).json({message: 'Produto não encontrado!'});
        return;
    }
    await produtoRepository.update(req.body);
    res.status(204).json();
}

async function deleteById(req, res) {
    const produto = await produtoRepository.findById(req.params.id);
    if (!produto) {
        res.status(404).json({message: 'Produto não encontrado!'});
        return;
    }
    await produtoRepository.deleteById(produto.id);
    res.status(204).json()
}

module.exports = { get, getById, post, putById, deleteById };