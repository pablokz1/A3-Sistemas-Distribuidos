const vendaRepository = require('../repositories/venda-repository');
const estoqueRepository = require('../repositories/estoque-repository');
const produtoRepository = require('../repositories/produto-repository');


async function get(req, res) {
    const vendas = await vendaRepository.findAll();
    res.json(vendas);
}

async function getById(req, res) {
    const venda = await vendaRepository.findById(req.params.id);
    if (!venda) {
        res.status(404).json({message: 'Venda não encontrada!'});
        return;
    }
    res.json(venda);
}

async function post(req, res) {
    try {
        const estoque = await estoqueRepository.findByProdutoId(req.body['produtoId']);
        if(estoque.quantidade_em_estoque < req.body['quantidade_produtos_vendidos']) {
            res.status(400).json({ message: 'Não existe estoque suficiente para efetuar essa venda!'})
            return;
        }
        const produto = await produtoRepository.findById(req.body['produtoId']);
        req.body['valor_total'] = produto.preco * req.body['quantidade_produtos_vendidos'];
        const venda = await vendaRepository.insert(req.body);
        await estoqueRepository.updateQuantidadeProduto(venda.produtoId, venda.quantidade_produtos_vendidos);
        res.status(201).json(venda);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro do Servidor Interno.' });
    }
}

async function putById(req, res) {
    const venda = await vendaRepository.findById(req.params.id);
    if (!venda) {
        res.status(404).json({message: 'Venda não encontrado!'});
        return;
    }
    await vendaRepository.update(req.body);
    res.status(204).json();
}

async function deleteById(req, res) {
    const venda = await vendaRepository.findById(req.params.id);
    if (!venda) {
        res.status(404).json({message: 'Venda não encontrado!'});
        return;
    }
    await vendaRepository.deleteById(venda.id);
    res.status(204).json()
}

module.exports = { get, getById, post, putById, deleteById };