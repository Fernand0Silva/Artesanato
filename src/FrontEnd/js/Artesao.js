document.getElementById('cadastroArtesaoForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const artesao = {
        Nome: document.getElementById('nome').value,
        Cidade: document.getElementById('cidade').value,
        Rg: document.getElementById('rg').value,
        Cpf: document.getElementById('cpf').value,
        Email: document.getElementById('email').value,
        Telefone: document.getElementById('telefone').value, 
        Endereco: document.getElementById('endereco').value,
        Idade: document.getElementById('idade').value
    };

    try {
        const response = await fetch('http://localhost:3000/Artesao', {    //http://localhost:3000/Artesao
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(artesao)
        });

        const responseText = await response.text(); // Captura a resposta como texto
        if (response.ok) {
            alert('Dados cadastrados com sucesso!');
            console.log('Resposta da API (texto):', responseText); // Log da resposta para depuração
            window.location.href = 'DadosArtesao.html'; 

        } else {
            alert('Erro ao cadastrar os dados!');
            console.error('Erro da API (texto):', responseText); // Log do erro da API
        }
    } catch (error) {
        console.error('Erro ao enviar os dados:',error);
        alert('Erro ao enviar os dados!');
    }
});
async function listarUltimoArtesao() {
try {
const response = await fetch('http://localhost:3000/Artesao', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
});

if (response.ok) {
    const artesaos = await response.json();
    const listaArtesaosDiv = document.getElementById('listarArtesaos');
    
    // Limpar a lista antes de preencher com novos dados
    listaArtesaosDiv.innerHTML = '';

    // Verificar se há artesãos cadastrados
    if (artesaos.length > 0) {
        // Obter o último artesão
        const ultimoArtesao = artesaos[artesaos.length - 1];
        
        // Criar o elemento para exibir o último artesão
        const artesaoDiv = document.createElement('div');
        artesaoDiv.innerHTML = `
           <h1>Último Artesão Cadastrado</h1>
            <p><strong>ID:</strong> ${ultimoArtesao.Id}</p>
            <p>Nome: ${ultimoArtesao.Nome}</p>
            <p>Cidade: ${ultimoArtesao.Cidade}</p>
            <p>RG: ${ultimoArtesao.Rg}</p>
            <p>CPF: ${ultimoArtesao.Cpf}</p>
            <p>Email: ${ultimoArtesao.Email}</p>
            <p>Telefone: ${ultimoArtesao.Telefone}</p>
            <p>Endereço: ${ultimoArtesao.Endereco}</p>
            <p>Idade: ${ultimoArtesao.Idade}</p>
            
        `;
        
        // Adicionar o artesão à div
        listaArtesaosDiv.appendChild(artesaoDiv);
    } else {
        listaArtesaosDiv.innerHTML = '<p>Nenhum artesão cadastrado!</p>';
    }
} else {
    alert('Erro ao buscar os dados!');
}
} catch (error) {
console.error('Erro:', error);
alert('Erro ao buscar os dados!');
}
}
//atualizar artesao
document.getElementById('atualizarArtesao').addEventListener('click', async function(event){
event.preventDefault();
const idArtesao = prompt("Digite o Id ");
const novoNome = prompt("Digite o nome do artesão ");
const novaCidade = prompt("Digite  a sua cidade");
const novoRg = prompt("Digite o seu rg  ");
const novoCpf = prompt("Digite o seu cpf  "); 
const novoEmail = prompt("Digite o seu e-mail  ");
const novoTelefone = prompt("Digite o seu telefone  ");
const novoEndereco = prompt("Digite o seu endereço  ");
const novaIdade = prompt("Digite a sua idade ");

if(idArtesao && novoNome && novaCidade && novoRg  && novoCpf && novoEmail && novoTelefone && novoEndereco && novaIdade){
try{
const response = await fetch(`http://localhost:3000/Artesao/${idArtesao}`,{
    method :'PUT',
    headers:{
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        Nome: novoNome,
        Cidade:novaCidade,
        Rg: novoRg,
        Cpf: novoCpf,
        Email:novoEmail,
        Telefone: novoTelefone,
        Endereco: novoEndereco,
        Idade: novaIdade,
    })
});
if (response.ok) {
        alert('Dados alterados  com sucesso!');
        listarUltimoArtesao();
    } else {
        alert('Erro ao alterar os dados!');
    }
} catch (error) {
    console.error('Erro:', error);
    alert('Erro ao alterar os dados!');
}
} else {
alert('ID do artesão é necessário para alterar.');
}
});

//Deletar artesao 
document.getElementById('deletarDados').addEventListener('click', async function(event) {
event.preventDefault();

const idArtesao = prompt("Digite o ID do artesão a ser deletado:");

if (idArtesao) {
try {
    const response = await fetch(`http://localhost:3000/Artesao/${idArtesao}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        alert('Dados deletados com sucesso!');
    } else {
        alert('Erro ao deletar os dados!');
    }
} catch (error) {
    console.error('Erro:', error);
    alert('Erro ao deletar os dados!');
}
} else {
alert('ID do artesão é necessário para deletar.');
}
});

document.getElementById('cadastroProdutoForm').addEventListener('submit',async function(event){
    event.preventDefault();
    const produto = {
        Nome: document.getElementById('Nome').value,
        Descricao: document.getElementById('Descricao').value,
        Preco: document.getElementById('Preco').value,
    };
    
     try {
        const response = await fetch('http://localhost:3000/Produto',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produto)
        })
        if (response.ok) {
            alert('Dados cadastrados com sucesso!');
            let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
            produtos.push(produto);
            localStorage.setItem('produtos', JSON.stringify(produtos));
            console.log(produtos);

            window.location.href = 'MeusProdutos.html'; 
          //  window.location.href = 'Compras.html';
        } else {
            alert('Erro ao cadastrar os dados!');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao enviar os dados!');
    }
});

async function listarUltimoProduto() {
try {
const response = await fetch('http://localhost:3000/Produto', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
});
if (response.ok) {
    const produtos = await response.json();
    const listaProdutosDiv = document.getElementById('listarProdutos');
    
    // Limpar a lista antes de preencher com novos dados
    listaProdutosDiv.innerHTML = '';                    

    // Verificar se há artesãos cadastrados
    if (produtos.length > 0) {
        // Obter o último artesão
        const ultimoProduto = produtos[produtos.length - 1];
        
        // Criar o elemento para exibir o último artesão
        const produtoDiv = document.createElement('div');
        produtoDiv.innerHTML = `
            <h3>Último Produto Cadastrado</h3>
            <p><strong>ID:</strong> ${ultimoProduto.Id}</p>
            <p>Nome: ${ultimoProduto.Nome}</p>
            <p>Descrição: ${ultimoProduto.Descricao}</p>
            <p>Preço: ${ultimoProduto.Preco}</p>
        `;
      
        listaProdutosDiv.appendChild(produtoDiv);
    } else {
        listaProdutosDiv.innerHTML = '<p>Nenhum produto cadastrado!</p>';
    }
} else {
    alert(`Dados cadastrados com sucesso! ID do Produto: ${data.id}`);
}
} catch (error) {
console.error('Erro:', error);
alert('Erro ao buscar os dados!');
}
}

// atualizar produto
document.getElementById('atualizarProduto').addEventListener('click', async function(event){
event.preventDefault();

const idProduto = prompt("Digite o Id ");
const novoNome = prompt("Digite o nome do produto ");
const novaDescricao = prompt("Digite uma descrição ");
//const novaImagem = prompt("Inserir Nova imagem ");
const novoPreco = prompt("Digite o preço  ");

if(idProduto && novoNome && novaDescricao && novoPreco){
try{
const response = await fetch(`http://localhost:3000/Produto/${idProduto}`,{
    method :'PUT',
    headers:{
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        Nome: novoNome,
        Descricao:novaDescricao,
        Preco: novoPreco
    })
});
if (response.ok) {
        alert('Dados alterados  com sucesso!');
    } else {
        alert('Erro ao alterar os dados!');
    }
} catch (error) {
    console.error('Erro:', error);
    alert('Erro ao alterar os dados!');
}
} else {
alert('ID do produto é necessário para alterar.');
}
});

document.getElementById('deletarProdutos').addEventListener('click', async function(event) {
event.preventDefault();

const idProduto = prompt("Digite o ID do produto a ser deletado:");

if (idProduto) {
try {
    const response = await fetch(`http://localhost:3000/Produto/${idProduto}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        alert('Dados deletados com sucesso!');
        let produtos = JSON.parse(localStorage.getItem('produtos'))|| [];
        produtos = produtos.filter(produto => produto.id !== id); 
        localStorage.setItem('produtos', JSON.stringify(produtos));
        atualizarCarrinho();
    } else {
    alert('Erro ao deletar os dados!');
    }
} catch (error) {
    console.error('Erro:', error);
    //alert('Erro ao deletar os dados!');
}
} else {
alert('ID do produto é necessário para deletar.');
}
});


// Seleciona a imagem e o contêiner dos botões
const img = document.getElementById("img");
const btnsNav = document.querySelector(".btns-nav");

// Adiciona o evento de clique na imagem
img.addEventListener("click", function() {
    // Alterna a visibilidade dos botões
    if (btnsNav.style.display === "none" || btnsNav.style.display === "") {
        btnsNav.style.display = "flex"; // Exibe os botões
    } else {
        btnsNav.style.display = "none"; // Esconde os botões
    }
});
