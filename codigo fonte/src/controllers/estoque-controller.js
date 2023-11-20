const estoqueRepository = require('../repositories/estoque-repository');


async function get(req, res) {
    const estoque = await estoqueRepository.findAll();
    res.json(estoque);
}

async function getById(req, res) {
    const estoque = await estoqueRepository.findById(req.params.id);
    if (!estoque) {
        res.status(404).json({message: 'Estoque não encontrado!'});
        return;
    }
    res.json(estoque);
}

async function post(req, res) {
    try {
        const estoque = await estoqueRepository.insert(req.body);
        res.status(201).json(estoque);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro do Servidor Interno.' });
    }
}

async function putById(req, res) {
    const estoque = await estoqueRepository.findById(req.params.id);
    if (!estoque) {
        res.status(404).json({message: 'Estoque não encontrado!'});
        return;
    }
    await estoqueRepository.update(req.body);
    res.status(204).json();
}

async function deleteById(req, res) {
    const estoque = await estoqueRepository.findById(req.params.id);
    if (!estoque) {
        res.status(404).json({message: 'Estoque não encontrado!'});
        return;
    }
    await estoqueRepository.deleteById(estoque.id);
    res.status(204).json()
}

module.exports = { get, getById, post, putById, deleteById };