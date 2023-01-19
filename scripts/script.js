'use strict';
let dados = {};
let arrayBookmarked = [
  //array que irá receber os nomes dos elementos que forem bookmarkeds
];
let arrayTrending = [];
let arrayRecomendados = [];

//! Carregando dados do arquivo JSON e o atribuido a variável dados -----------

if (sessionStorage.getItem('dados')) {
  comecaCodigo();
} else {
  fetch('./data.json')
    .then((response) => response.json())
    .then((json) => {
      sessionStorage.setItem('dados', JSON.stringify(json));
      comecaCodigo();
    });
}

//! Carregando dados do arquivo JSON e o atribuido a variável dados -----------

function comecaCodigo() {
  atualizaTrendingERecomendados();
  criaOsCards();
  atualizaTodosBookmarks();
  selecionaosBookmark();
  pesquisaMostraEEscondeDivs();

  //----------------------
}

//! Funções utilizadas no programa  --------------------------------------------

function atualizaTrendingERecomendados() {
  dados = JSON.parse(sessionStorage.getItem('dados'));
  dados.map((elemento) => {
    elemento.isTrending
      ? arrayTrending.push(elemento)
      : arrayRecomendados.push(elemento);
  });
}

function criaOsCards() {
  //! Selecionando os Containers  Pai ---
  const paiCardsEmAlta = document.getElementById('container_cards_em_alta');
  const paiCardsRecomendados = document.getElementById(
    'container_cards_recomendados'
  );
  //! Selecionando os Containers Pai ---

  //!Criando os cards em Alta ---
  arrayTrending.map((card, index) => {
    paiCardsEmAlta.innerHTML += `<div class="card_em_alta">
    <div class="bookmark_container">
      <img src="./assets/icon-bookmark-empty.svg" alt="" class="bookmark_icon" />
    </div>
    <div class="container_informacoes">
      <div class="informacoes_details">
        <div class="first_row">
          <p class="card_year">${card.year}</p>
          <ul>
            <li>
              <img
                src="./assets/icon-category-${
                  card.category === 'Movie' ? 'movie' : 'tv'
                }.svg"
                alt=""
                class="category_icon"
              />
              <p class="category_name">${card.category}</p>
            </li>
            <li><p class="classification">${card.rating}</p></li>
          </ul>
        </div>
        <p class="card_title">${card.title}</p>
      </div>
    </div>
  </div>`;
    //Selecionando os cards para alterar a imagem de fundo --------------------
  });
  //Selecionando os containers e alterando a imagem de fundo
  let containersImagesTrending = document.querySelectorAll('.card_em_alta');
  arrayTrending.map((objeto, index) => {
    containersImagesTrending[
      index
    ].style.backgroundImage = `url("${objeto.thumbnail.trending.small}")`;
  });
  //!Criando os cards em Alta ---

  //!Criando os cards Recomendados ---
  arrayRecomendados.map((card, index) => {
    paiCardsRecomendados.innerHTML += `<div class="card_resultado">
    <div class="bookmark_container">
      <img src="./assets/icon-bookmark-empty.svg" alt="" class="bookmark_icon" />
    </div>
    <div class="container_imagem"></div>
    <div class="container_informacoes_recomendado">
      <div class="first_row">
        <p class="card_year">${card.year}</p>
        <ul>
          <li>
            <img
              src="./assets/icon-category-${
                card.category === 'Movie' ? 'movie' : 'tv'
              }.svg"
              alt=""
              class="category_icon"
            />
            <p class="category_name">${card.category}</p>
          </li>
          <li><p class="classification">${card.rating}</p></li>
        </ul>
      </div>
      <p class="card_title">${card.title}</p>
    </div>
  </div>`;
  });
  let containerImagesRecomendadas =
    document.querySelectorAll('.container_imagem');
  arrayRecomendados.map((objeto, index) => {
    containerImagesRecomendadas[
      index
    ].style.backgroundImage = `url("${objeto.thumbnail.regular.small}")`;
  });

  //!Criando os cards Recomendados ---
}

function selecionaosBookmark() {
  //Selecionando todos os bookMarks
  let containersBookmark = document.querySelectorAll('.bookmark_container');

  //Fazendo o loop para adicionar event listener em todos eles
  containersBookmark.forEach((container, index) => {
    container.addEventListener('click', () => {
      //! Caso o bookmark clicado seja da classe "Trending/emAlta" -->

      if (container.parentElement.classList.contains('card_em_alta')) {
        atualizaNuvem(
          container.parentElement.children[1].children[0].children[1]
            .textContent
        );
        atualizaOBookmarkClicado(
          container.parentElement.children[1].children[0].children[1]
            .textContent,
          container.parentElement,
          container
        );

        //! Caso o bookmark clicado seja da classe recomendado
      } else if (container.parentElement.classList.contains('card_resultado')) {
        atualizaNuvem(
          container.parentElement.children[2].children[1].textContent
        );
        atualizaOBookmarkClicado(
          container.parentElement.children[2].children[1].textContent,
          container.parentElement,
          container
        );
      } else if (as) {
      }
    });
  });
}

function atualizaOBookmarkClicado(stringTitulo, pai, container) {
  dados = JSON.parse(sessionStorage.getItem('dados'));

  //-- COmparando o título passado e atribuindo a variável temp o objeto correspondente.
  let temp = dados.filter((elemento) => {
    return elemento.title === stringTitulo ? true : false;
  });

  //Utilizando o objeto na variável temp para fazer a atualização correspondente do bookmark

  if (temp[0].isBookmarked) {
    container.children[0].src = './assets/icon-bookmark-full.svg';
  } else {
    container.children[0].src = './assets/icon-bookmark-empty.svg';
  }
}

function atualizaNuvem(nomeDoPrograma) {
  //todo Função que é chamada toda vez que o um container do bookMark é clicado, irá mudar o estado "isBookmarking" do objeto correspondente ao título do bookMark clicado.

  dados = JSON.parse(sessionStorage.getItem('dados'));
  dados.map((elemento, index) => {
    if (elemento.title === nomeDoPrograma) {
      //Faz a verificação do estado atual da propriedade isBookmarked do elemento e a muda.
      elemento.isBookmarked === true
        ? (elemento.isBookmarked = false)
        : (elemento.isBookmarked = true);
    }
  });
  sessionStorage.setItem('dados', JSON.stringify(dados));
  // sessionStorage.setItem(JSON.stringify('dados', dados));
}

function atualizaTodosBookmarks() {
  let containersBookmark = document.querySelectorAll('.bookmark_container');
  let cardsTitles = document.querySelectorAll('.card_title');
  let bookmarkIcons = document.querySelectorAll('.bookmark_icon');

  cardsTitles.forEach((title, index) => {
    //Criando uma variável temporária para segurar o objeto que será usado para ver se o bookmark do card deve ser alterado ou não.
    let temp = dados.filter((objeto) => {
      return objeto.title === title.textContent ? true : false;
    });

    //Utilizando a variável temp para alterar os cards que tiverem sua propriedade isBookmarked = true
    if (temp[0].isBookmarked) {
      bookmarkIcons[index].src = './assets/icon-bookmark-full.svg';
    } else {
      bookmarkIcons[index].src = './assets/icon-bookmark-empty.svg';
    }
  });
}

function pesquisaMostraEEscondeDivs() {
  /*  */
  const searchInput = document.getElementById('search_input');

  //!Selecionando as divs que serão manipuladas --
  let containerEmAlta = document.getElementById('container_em_alta');
  let containerRecomendado = document.getElementById('container_recomendado');
  let containerResultado = document.getElementById(
    'container_resultado_pesquisa'
  );
  //!Selecionando as divs que serão manipuladas --

  searchInput.addEventListener('input', () => {
    //verificação se o valor dentro do input está vazio ou não, caso esteja vázio as divs iniciais serão mostradas, do contrário, as primeiras divs serão ocultadas e apenas a div de resultado irá ser mostrada.

    if (searchInput.value === '') {
      containerEmAlta.style.display = 'flex';
      containerRecomendado.style.display = 'flex';
      containerResultado.style.display = 'none';
    } else {
      containerEmAlta.style.display = 'none';
      containerRecomendado.style.display = 'none';
      containerResultado.style.display = 'flex';
    }
    //-----
    checaDadosECriaCards(searchInput.value);
    atualizaTodosBookmarks();
    selecionaosBookmark();
  });
}

function checaDadosECriaCards(stringPesquisada) {
  let containerResultado = document.getElementById(
    'container_resultado_pesquisa'
  );
  // Pegando os dados da nuvem --> fazendo um filter utilizando a propriedade "title" desses objetos para fazer um filter no array e colocando os dados correspondentes a pesquisa dentro da variável "temp"
  let dados = JSON.parse(sessionStorage.getItem('dados'));
  let temp = dados.filter((objeto) => {
    return objeto.title.toLowerCase().includes(stringPesquisada.toLowerCase())
      ? true
      : false;
  });

  //Utilizando o array map contendo os objetos para criar 'cardsResultado'.
  containerResultado.innerHTML = '';
  temp.map((objeto) => {
    containerResultado.innerHTML += `<div class="card_resultado">
    <div class="bookmark_container">
      <img src="./assets/icon-bookmark-empty.svg" alt="" class="bookmark_icon" />
    </div>
    <div class="container_imagem_resultado"></div>
    <div class="container_informacoes_recomendado">
      <div class="first_row">
        <p class="card_year">${objeto.year}</p>
        <ul>
          <li>
            <img
              src="./assets/icon-category-${
                objeto.category === 'Movie' ? 'movie' : 'tv'
              }.svg"
              alt=""
              class="category_icon"
            />
            <p class="category_name">${objeto.category}</p>
          </li>
          <li><p class="classification">${objeto.rating}</p></li>
        </ul>
      </div>
      <p class="card_title">${objeto.title}</p>
    </div>
  </div>`;
  });

  // Seleciona todos os containers de container_imagem_resultado para as atualizar
  let containersImagensResultados = document.querySelectorAll(
    '.container_imagem_resultado'
  );
  containersImagensResultados.forEach((container, index) => {
    container.style.backgroundImage = `url("${temp[index].thumbnail.regular.small}")`;
  });
}
