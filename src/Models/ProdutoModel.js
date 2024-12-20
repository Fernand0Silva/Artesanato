const { sql } = require('../Database/BdConfig');

async function listarProdutos() {
    const pool = await sql.connect(); 
    const data = await pool.request().query('SELECT * FROM tbl_Produto'); 
    return data.recordset;  // Retorna os dados
}

async function criarProduto(Nome,Descricao,Preco) {
    const pool = await sql.connect();
    const result = await pool.request()
    .input('Nome',sql.NVarChar,Nome)
    .input('Descricao',sql.NVarChar,Descricao)
   // .input('Imagem',sql.NVarChar,Imagem)// Armazena o caminho ou nome da imagem
    .input('Preco',sql.Decimal,Preco)
    .query('INSERT INTO tbl_Produto (Nome, Descricao, Preco) OUTPUT INSERTED.Id VALUES (@Nome, @Descricao, @Preco)');  
    //.query('INSERT INTO tbl_Produto (Nome, Descricao, Imagem, Preco) OUTPUT INSERTED.Id VALUES (@Nome, @Descricao, @Imagem, @Preco)');  
     //OUTPUT INSERTED.Id VALUES = faz p sql retornar o ID gerado ao inserir o novo produto;
    return result.recordset[0].Id;
 
}
async function listarProdutoPorId(id) {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('Id', sql.Int, id)
        .query('SELECT * FROM tbl_Produto WHERE Id = @Id');
    return result.recordset[0]; // Retorna o primeiro resultado
}
async function atualizarProduto(id,Nome,Descricao,Preco) {
    const pool = await sql.connect();
    const result = await pool.request()
    .input('Id', sql.Int, id)
    .input('Nome',sql.NVarChar,Nome)
    .input('Descricao',sql.NVarChar,Descricao)
   // .input('Imagem',sql.VarBinary(sql.MAX), Imagem)
    .input('Preco',sql.Money,Preco)
    .query('UPDATE tbl_Produto SET Nome = @Nome, Descricao = @Descricao, Preco = @Preco WHERE Id = @Id');
    return result.rowsAffected[0];  
}

module.exports = { listarProdutos, criarProduto,listarProdutoPorId,atualizarProduto}; 
