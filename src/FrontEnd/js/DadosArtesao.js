async function listarArtesaos() {
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
            listaArtesaosDiv.innerHTML = ''; // Limpa a lista antes de preencher

            if (artesaos.length > 0) {
                artesaos.forEach(artesao => {
                    const artesaoDiv = document.createElement('div');
                    artesaoDiv.innerHTML = `<br>
                      <nav id="nav-div">
                        <div class="conteudo">
                            <p id="conteudo-div" classe="Id"><strong>ID:</strong> ${artesao.Id}</p>
                            <p id="conteudo-div" ><strong>Nome:</strong> ${artesao.Nome}</p>
                            <p id="conteudo-div"><strong>Cidade:</strong> ${artesao.Cidade}</p>
                            <p id="conteudo-div"><strong>RG:</strong> ${artesao.Rg}</p>
                            <p id="conteudo-div"><strong>CPF:</strong> ${artesao.Cpf}</p>
                            <p id="conteudo-div"><strong>E-mail:</strong> ${artesao.Email}</p>
                            <p id="conteudo-div"><strong>Telefone:</strong> ${artesao.Telefone}</p>
                            <p id="conteudo-div"><strong>Endereço:</strong> ${artesao.Endereco}</p>
                            <p id="conteudo-div"><strong>Idade:</strong> ${artesao.Idade}</p>
                        </div> <br> 
                        </nav>
                    `;
                    
   
                    listaArtesaosDiv.appendChild(artesaoDiv);
                });
            } else {
                listaArtesaosDiv.innerHTML = '<p>Nenhum artesão cadastrado!</p>';
            }
        } else {
            alert('Erro ao buscar os artesão!');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao buscar os artesãos!');
    }
}

// Chama a função ao carregar a página
window.onload = listarArtesaos;