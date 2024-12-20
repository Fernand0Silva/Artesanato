async function carregarProdutos() {
    const params = new URLSearchParams(window.location.search);
    const nomeProduto = params.get('nome');

    if (nomeProduto) {
        try {
            const response = await fetch(`http://localhost:3000/search?query=${nomeProduto}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const produtos = await response.json();
                const produtoDetalhesDiv = document.getElementById('produtoDetalhes');
                produtoDetalhesDiv.innerHTML = ''; // Limpa detalhes anteriores

                if (produtos.length > 0) {
                produtos.forEach(produto => {
                    const produtoDiv = document.createElement('div');
                    produtoDiv.innerHTML = `
                    <div class="container">
                        <div class="produto-Pesquisado">
                            <h3>${produto.Nome}</h3>
                            <p><b>Nome:</b> ${produto.Nome}</p>
                            <p><b>Descrição:</b> ${produto.Descricao}</p>
                            <p><b>Preço:</b> R$ ${produto.Preco.toFixed(2)}</p>
                             <button class="btn-Comprar"  onclick="adicionarAoCarrinho('${produto.Nome}', '${produto.Descricao}', ${produto.Preco})">Comprar</button>
                            </div>
                    </div>
                        
                    `;
                        produtoDetalhesDiv.appendChild(produtoDiv);
                        //window.onload = Carrinho;
                    });
                    
                } else {
                    produtoDetalhesDiv.innerHtml = `<div>
                    <h3 class="h3">Nenhum produto encontrado!</h3>
                    </div>`;
                    alert("Nenhum produto encontrado");
                }
            } else {
                alert('Erro ao buscar os produtos!');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao buscar os produtos!');
        }
    } else {
        document.getElementById('produtoDetalhes').innerText = 'Nenhum produto especificado!';
    }
}

// Carregar produtos ao abrir a página
window.onload = carregarProdutos;


function adicionarAoCarrinho(nome, descricao, preco) {
const produto = { nome, descricao, preco };
carrinho.push(produto);
atualizarCarrinho();
alert(`${nome} foi adicionado ao seu carrinho!`);
}
function adicionarAoCarrinho(nome, descricao, preco) {
const carrinho = JSON.parse(localStorage.getItem('carrinho')) || []; // Carrega o carrinho existente
const produto = { nome, descricao, preco };
carrinho.push(produto); // Adiciona o novo produto
localStorage.setItem('carrinho', JSON.stringify(carrinho)); // Atualiza o localStorage
alert(`${nome} foi adicionado ao seu carrinho!`);
}
