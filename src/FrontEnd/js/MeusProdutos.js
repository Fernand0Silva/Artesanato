async function listarProdutos() {
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
            listaProdutosDiv.innerHTML = ''; // Limpa a lista antes de preencher

            if (produtos.length > 0) {
                produtos.forEach(produto => {
                    const produtoDiv = document.createElement('div');
                    produtoDiv.innerHTML = `
                        <div class="dados">
                            <p class="itens"><strong>ID:</strong> ${produto.Id}</p>
                            <p class="itens">Nome: ${produto.Nome}</p>
                            <p class="itens">Descrição: ${produto.Descricao}</p>
                            <p class="itens">Preço: ${produto.Preco}</p>
                        </div>
                         
                    `;
                    listaProdutosDiv.appendChild(produtoDiv);
                });
            } else {
                listaProdutosDiv.innerHTML = '<p>Nenhum produto cadastrado!</p>';
            }
        } else {
            alert('Erro ao buscar os produtos!');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao buscar os produtos!');
    }
}

// Chama a função ao carregar a página
window.onload = listarProdutos;