const express = require('express');
const { getProdutos,inserirProduto,listarProdutoPorIdHandler,atualizarProdutoHandler,deletarProduto,} = require('../Controllers/ProdutoController');
const router = express.Router();
const multer = require('multer');

const upload = multer({ dest: 'uploads/' })

/*router.post('/', upload.single('Imagem'), async (req, res) => {
    try {
        await inserirProduto(req, res); // Lembre-se de que `inserirProduto` deve lidar com os dados de `req.file`
    } catch (error) {
        res.status(500).json({ message: 'Erro ao inserir produto', error: error.message });
    }
});*/

router.get('/', getProdutos);
router.post('/',inserirProduto); 
router.get('/:id', listarProdutoPorIdHandler);
router.put('/:id', atualizarProdutoHandler);
router.delete('/:id', deletarProduto);

module.exports = router;

