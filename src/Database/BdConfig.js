const sql = require('mssql');
const config={
    user:"sa",//sa artesananto_user
    password:"123456",//"123456" //J72nXic4R6XYOpay6dV42q1sBNd0QsNs
    server:"localhost",
    database:"Atelie",//artesananto  Artesanato
    options:{
        trustServerCertificate:true,
        trustedConnection:false,
        enableArithbort:true,
        instancename:"SQLEXPRESS",
    },
    port:1433
    
} // url esterna : postgresql://artesanato_user:SBFWpf9G5V6tPGYm42VMbSXW7ZtbGkvZ@dpg-ct1j5552ng1s73e70cs0-a.oregon-postgres.render.com/artesanato
/*const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'deftly-relaxed-coyote.data-1.use1.tembo.io',
  database: 'artesanato',
  password: 'N9bUWdTaajhYySia',
  port: 5432,
  ssl: {
    rejectUnauthorized: false, // Permite a conexão sem a verificação completa do certificado (útil em alguns servidores como o Render)
  },
  port:5432
});

pool.connect()
  .then(client => {
    console.log("Conectado ao PostgreSQL");
    client.release();
  })
  .catch(err => console.error("Erro ao conectar ao PostgreSQL", err));
/*require('dotenv').config();
const  {Pool}  = require('pg');

const config = {
    connectionString: process.env.DATABASE_URL, // Usa a variável de ambiente
    ssl: {
      rejectUnauthorized: false, // Certifique-se de permitir conexões SSL se necessário
    },
  };*/

/*const config = {
    user: 'artesananto_user', // O nome do usuário do banco de dados
  host: 'dpg-csvtecl6l47c7382rb8g-a.oregon-postgres.render.com', // Endereço de conexão do Render
  database: 'artesananto',   // Nome do banco de dados
  password: 'J72nXic4R6XYOpay6dV42q1sBNd0QsNs', // A senha fornecida pelo Render
  port: 5432,                // Porta padrão do PostgreSQL
};*/


async function conectarBanco() {
    try {
        await sql.connect(config);
        console.log('Conectado ao SQL Server');
    } catch (err) {
        console.error('Erro ao conectar ao SQL Server:', err);
    }
}

conectarBanco();

/*app.get('/Produto',async(req,res)=>{
    try{
    const pool = await sql.connect(config);
    const data = pool.request().query('select * from tbl_Produto');
    data.then(resl=>{
        return res.json(resl);
    });
} 
catch(err)
{
    console.log(err);
}
});

app.get('/Artesao',async(req,res)=>{
    try{
    const pool = await sql.connect(config);
    const data = pool.request().query('select * from tbl_Artesao');
    data.then(resl=>{
        return res.json(resl);
    });
} 
catch(err)
{
    console.log(err);
}
});

app.get('/',(req,res)=>{
    return res.json("backend on!!!");
});*/

/*const port = 3000;

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});*/

//Exporta a conexão e a função para ser usada em outros arquivos
module.exports = { sql,conectarBanco /*pool*/ }; 