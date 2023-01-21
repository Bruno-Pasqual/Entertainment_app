'use strict';
let arrayFilmes = [];
let arrayTv = [];
let dados = [];
comecaScript();

function comecaScript() {
  arrayFilmes = [];
  arrayTv = [];
  atualizaArrayFilmesETv();
  criaOsCards();
  habilitaBookmarks();
  pesquisaEscondeEMostra();
}

//! -------------------

function atualizaArrayFilmesETv() {
  //Atribuindo o array de objetos a variável dados --
  let dados = JSON.parse(sessionStorage.getItem('dados'));
  //Utilizando o map para atualizar os 'arrayTV' e 'arrayFilmes'
  dados.map((objeto) => {
    if (objeto.isBookmarked) {
      objeto.category === 'Movie'
        ? arrayFilmes.push(objeto)
        : arrayTv.push(objeto);
    }
  });
}

function criaOsCards() {
  let containersPai = document.querySelectorAll(
    '.container_cards_recomendados'
  );
  let containerCardsFilmes = document.getElementById(
    'container_cards_filmes_bookmark'
  );
  let containerSeriesPai = document.getElementById(
    'container_cards_series_bookmark'
  );

  let arraytodos = [...arrayTv, ...arrayFilmes];
  containerCardsFilmes.innerHTML = '';
  containerSeriesPai.innerHTML = '';

  //Criando os cards dos cards dos programas de tv bookmarked

  arrayTv.map((objeto) => {
    containerCardsFilmes.innerHTML += `<div class="card_resultado">
    <div class="bookmark_container">
      <img src="./assets/icon-bookmark-${
        objeto.isBookmarked ? 'full' : empty
      }.svg" alt="" class="bookmark_icon" />
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

  arrayFilmes.map((objeto) => {
    containerSeriesPai.innerHTML += `<div class="card_resultado">
    <div class="bookmark_container">
      <img src="./assets/icon-bookmark-full.svg" alt="" class="bookmark_icon" />
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

  let cardsResultados = document.querySelectorAll(
    '.container_imagem_resultado'
  );

  //Atualizando as imagens em todos os cards criados
  arraytodos.map((objeto, index) => {
    cardsResultados[
      index
    ].style.backgroundImage = `url("${objeto.thumbnail.regular.small}")`;
  });
}

//! Selecionando os elementos ---------
function habilitaBookmarks() {
  let bookmarkContainers = document.querySelectorAll('.bookmark_container');
  let bookmarkIcon = document.querySelectorAll('.bookmark_icon');
  let containerTitles = document.querySelectorAll('.card_title');

  //! Selecionando os elementos ---------

  bookmarkContainers.forEach((container, index) => {
    container.addEventListener('click', () => {
      mudaEAtualizaNuvem(containerTitles[index].textContent);
    });
  });
}

function mudaEAtualizaNuvem(containerTitle) {
  dados = JSON.parse(sessionStorage.getItem('dados'));
  let temp;
  dados.map((objeto, index) => {
    if (objeto.title === containerTitle) {
      temp = index;
    }
  });

  dados[temp].isBookmarked = false;
  sessionStorage.setItem('dados', JSON.stringify(dados));
  comecaScript();
}

function pesquisaEscondeEMostra() {
  //! Selecionando os elementos --
  let searchInput = document.getElementById('search_input');
  let containerPaiFilmes = document.getElementById('container_pai_filmes');
  let containerPaiTV = document.getElementById('container_pai_tv');
  let containerResultadoPesquisa = document.getElementById(
    'container_resultado_pesquisa'
  );
  //! Selecionando os elementos --

  searchInput.addEventListener('input', () => {
    console.log(searchInput.value.length != 0);
    if (searchInput.value.length !== 0) {
      containerPaiFilmes.style.display = 'none';
      containerPaiTV.style.display = 'none';
      containerResultadoPesquisa.style.display = 'flex';
      mostraResultadoPesquisa(searchInput.value);
    } else {
      containerPaiFilmes.style.display = 'block';
      containerPaiTV.style.display = 'block';
      containerResultadoPesquisa.style.display = 'none';
    }
  });
}

function mostraResultadoPesquisa(stringPesquisada) {
  const containerCardsPesquisa = document.getElementById(
    'container_pesquisa_cards'
  );
  let bookmarkedShows = [...arrayFilmes, ...arrayTv];
  let showsCorrespondem = bookmarkedShows.filter((objeto) => {
    return objeto.title.toLowerCase().includes(stringPesquisada.toLowerCase())
      ? true
      : false;
  });

  //Criando os cards e alterando as informações
  containerCardsPesquisa.innerHTML = '';
  showsCorrespondem.map((objeto) => {
    containerCardsPesquisa.innerHTML += `<div class="card_resultado">
    <div class="bookmark_container">
      <img src="./assets/icon-bookmark-${
        objeto.isBookmarked ? 'full' : empty
      }.svg" alt="" class="bookmark_icon" />
    </div>
    <div class="container_img_pesquisa"></div>
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

  let cardsResultados = document.querySelectorAll('.container_img_pesquisa');
  console.log(cardsResultados);

  //Atualizando as imagens em todos os cards criados
  showsCorrespondem.map((objeto, index) => {
    cardsResultados[
      index
    ].style.backgroundImage = `url("${objeto.thumbnail.regular.small}")`;
  });
}
