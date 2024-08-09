const botoesCategoria = document.querySelectorAll('.categoria__botao');
const botaoVoltar = document.querySelectorAll('.btn-voltar');
const botoesFiltro = document.querySelectorAll('.filtro__botao');
let nomeLabel = document.querySelector('.filtro__ativado');

botaoVoltar.forEach(botao => {
    botao.addEventListener('click', () => {
        let inicio = document.querySelector('.inicio');
        inicio.style.display = 'flex';
        document.querySelector('.filmes').style.display = 'none';
        document.querySelector('.series').style.display = 'none';
        document.querySelector('.animes').style.display = 'none';
    });
});

botoesCategoria.forEach(botao => {
    botao.addEventListener('click', () => {
        let nomeBotao = botao.textContent
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
        let display = `.${nomeBotao}`;
        atual = display;
        let secao = document.querySelector(`${display}`);
        secao.style.display = 'block';
        let inicio = document.querySelector('.inicio');
        inicio.style.display = 'none';
    });
});

botoesFiltro.forEach(botao => {
    let categoria = botao
        .getAttribute('name')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

    botao.addEventListener('click', () => filtrarConteudo(categoria));
    botao.addEventListener(
        'click',
        () => (nomeLabel.innerHTML = botao.textContent),
    );
});

function pegarLista(tipo) {
    let lista = document.querySelector(`.${tipo}`);
    return lista;
}

function filtrarConteudo(filtro) {
    const listas = document.querySelectorAll('.lista__conteudo');
    for (let item of listas) {
        let categoria = item
            .querySelector('.categoria')
            .textContent.toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
        let valorFiltro = filtro;

        if (categoria != valorFiltro && valorFiltro != 'tudo') {
            item.style.display = 'none';
        } else {
            item.style.display = '';
        }
    }
}

async function buscarEMostrarConteudo() {
    try {
        const busca = await fetch('dados.json');
        const disponiveis = await busca.json();
        const dados = disponiveis.dados;

        dados.forEach(dado => {
            const dadoCategoria = dado.categoria
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '');

            const lista = pegarLista(dado.tipo.toLowerCase());

            lista.innerHTML += `
            <ul class="lista__conteudo">
            <li class="padrao__item item">
            <img
            src="${dado.imagem}"
            class="padrao__imagem imagem"
            />
            <a href="${dado.url}">
            <h3 class="item__titulo">${dado.titulo}</h3>
            </a>
            
            <p class="padrao__descricao descricao">${dado.descricao}
            </p>
            <p class="tipo" hidden>${dado.tipo}</p>
            <p class="categoria" hidden>${dado.categoria}</p>
            </li>
            <ul>`;
        });
    } catch (error) {
        console.log(error);
    }
}

function limparConteudo() {
    document.querySelectorAll('.filmes, .series, .animes').forEach(secao => {
        teste = secao.children[4];
        teste.style.display = 'none';
    });
}

buscarEMostrarConteudo();
