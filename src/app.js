const express = require('express');
const cors = require('cors');
const sql = require('mssql');
const { conectarBanco } = require('./Database/BdConfig');
const jwt = require('jsonwebtoken');
const multer= require('multer');
const path = require('path');
const Pool = require('pg');
const {storage} = require('./multerConfig');

//12345678
/*workstation id=artesanato.mssql.somee.com;packet size=4096;user id=saluizfernando;pwd=12345678;data source=artesanato.mssql.somee.com;persist security info=False;initial catalog=artesanato;TrustServerCertificate=True*/

const produtoRoutes = require('./Routes/ProdutoRoutes');
const artesaoRoutes = require('./Routes/ArtesaoRoutes');
const cadastroRoutes = require('./Routes/CadastroRoutes'); 
const loginRoutes = require('./Routes/LoginRoutes');
const bodyParser = require('body-parser');
const pesquisaRoutes = require('./Routes/PesquisaRoutes');

const app = express();
const port = 3000;
//const port = 5432;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
//app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve arquivos da pasta uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//console.log('Caminho para a pasta uploads:', path.join(__dirname, 'uploads'));

const uploadsPath = path.join(__dirname, 'uploads');
console.log('Caminho para a pasta uploads:', uploadsPath); // Isso vai mostrar o caminho completo da pasta uploads
app.use('/uploads', express.static(uploadsPath));


const upload = multer({ storage: storage });

app.post("/uploads", upload.single('imagem'), async (req, res) => {
    if (req.file) {
        return res.json({
            erro: false,
            message: "Upload realizado com sucesso!"
        });
    }
    return res.status(400).json({
        erro: true,
        message: "Erro: Upload não realizado "
    });
});

//conectarBanco();

// Rotas
app.use('/Produto', produtoRoutes);
app.use('/Artesao', artesaoRoutes);
app.use('/Cadastro', cadastroRoutes);
app.use('/Login', loginRoutes);


app.get('/search', async (req, res) => {
    const query = req.query.query;

    if (!query) {
        return res.status(400).send('Parâmetro de busca não fornecido');
    }

    try {
        const result = await sql.query`
            SELECT * FROM tbl_Produto WHERE Nome LIKE ${'%' + query + '%'}
        `;

        if (result.recordset.length > 0) {
            res.json(result.recordset);
        } else {
            res.status(404).send('Nenhum produto encontrado');
        }
    } catch (error) {
        console.error('Erro ao buscar produtos:', error.message);
        res.status(500).send(`Erro no servidor: ${error.message}`); // Envia o erro detalhado para o cliente
    }
});

app.post('/recuperar', async (req, res) => {
    const { telefone } = req.body;

    try {
        await sql.connect(config);
        const result = await sql.query`SELECT senha FROM from tbl_Cadastro WHERE telefone = ${telefone}`;
        
        if (result.recordset.length > 0) {
            const senha = result.recordset[0].senha;
            res.json({ senha });
        } else {
            res.status(404).json({ error: 'Usuário não encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao acessar o banco de dados.' });
    }
});

app.get('/', (req, res) => {
    return res.json('Servidor   Iniciado com Sucesso :)');
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`);
});


