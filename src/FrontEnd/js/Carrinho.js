   function carregarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const carrinhoItemsDiv = document.getElementById('carrinhoItems');
    carrinhoItemsDiv.innerHTML = ''; // Limpa a lista anterior

    if (carrinho.length > 0) {
        let valorTotal = 0;
        carrinho.forEach((produto, index) => {
            valorTotal += produto.preco;
            const produtoDiv = document.createElement('div');
            produtoDiv.innerHTML = `
                <div id="div-produto">
                    <p id="itens"><b>Produto:</b> ${produto.nome}</p>
                    <p id="itens"><b>Descrição:</b> ${produto.descricao}</p>
                    <p id="itens"><b>Preço:</b> R$ ${produto.preco.toFixed(2)}</p>
                    <button id="btn-remover" onclick="removerDoCarrinho(${index})"
                    >Remove</button>
                </div>`;
            carrinhoItemsDiv.appendChild(produtoDiv);
        });
        carrinhoItemsDiv.innerHTML += `<p style="color: black;
                                         display: flex;
                                        justify-content: center;
                                        font-size: 25px;
                                        padding:10px"><b>Valor Total:</b> R$ ${valorTotal.toFixed(2)}
                                        </p>`;

    } else {
        carrinhoItemsDiv.innerHTML = '<p>Seu carrinho está vazio!</p>';
    }
}

function removerDoCarrinho(index) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.splice(index, 1); // Remove o produto do array
    localStorage.setItem('carrinho', JSON.stringify(carrinho)); // Atualiza o localStorage
    carregarCarrinho(); // Recarrega a lista
    alert("Produto Removido com sucesso!");
}

function finalizarCompra() {
    alert('Compra finalizada!'); 
    localStorage.removeItem('carrinho'); // Limpa o carrinho após a compra
    carregarCarrinho(); // Atualiza a exibição
}

// Carregar os produtos do carrinho ao abrir a página
window.onload = carregarCarrinho;