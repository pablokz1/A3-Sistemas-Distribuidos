const clienteRepository = require('../repositories/cliente-repository');


async function get(req, res) {
    const cliente = await clienteRepository.findAll();
    res.json(cliente);
}

async function getById(req, res) {
    const cliente = await clienteRepository.findById(req.params.id);
    res.json(cliente);
}

async function post(req, res) {
    try {
        const existeEmail = await clienteRepository.findByEmail(req.body.email);
        if (existeEmail) {
            return res.status(400).json({ error: 'Email já cadastrado.' });
        }
        const existeCpf = await clienteRepository.findByCpf(req.body.cpf);
        if (existeCpf) {
            return res.status(400).json({ error: 'CPF já cadastrado.' });
        }
        const cliente = await clienteRepository.insert(req.body);
        res.status(201).json(cliente);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro do Servidor Interno.' });
    }
}

async function putById(req, res) {
    const cliente = await clienteRepository.findById(req.params.id);
    if (!cliente) {
        res.status(404).json({message: 'Cliente não encontrado!'});
        return;
    }
    await clienteRepository.update(req.body);
    res.status(204).json();
}

async function deleteById(req, res) {
    const cliente = await clienteRepository.findById(req.params.id);
    if (!cliente) {
        res.status(404).json({message: 'Cliente não encontrado!'});
        return;
    }
    await clienteRepository.deleteById(cliente.id);
    res.status(204).json()
}

module.exports = { get, getById, post, putById, deleteById };