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
      console.log('vou passar no fetch');
      comecaCodigo();
    });
}

function comecaCodigo() {
  puxaDadosEAtualiza();
  criaOsCards();
  //----------------------
}

function puxaDadosEAtualiza() {
  dados = JSON.parse(sessionStorage.getItem('dados'));
  console.log(dados);
  dados.map((elemento) => {
    elemento.isTrending
      ? arrayTrending.push(elemento)
      : arrayRecomendados.push(elemento);
  });

  console.log(arrayTrending);
  console.log(arrayRecomendados);
}

function criaOsCards() {
  //! Selecionando os Containers Pai ---
  const paiCardsEmAlta = document.getElementById('container_cards_em_alta');
  const paiCardsRecomendados = document.getElementById(
    'container_cards_recomendados'
  );
  //! Selecionando os Containers Pai ---

  //!Criando os cards em Alta ---
  arrayTrending.map((elemento, index) => {
    paiCardsEmAlta.innerHTML += `<div class="card_em_alta">
    <div class="bookmark_container">
      <img src="./assets/icon-bookmark-empty.svg" alt="" class="bookmark_icon" />
    </div>
    <div class="container_informacoes">
      <div class="informacoes_details">
        <div class="first_row">
          <p class="card_year">2019</p>
          <ul>
            <li>
              <img
                src="./assets/icon-category-movie.svg"
                alt=""
                class="category_icon"
              />
              <p class="category_name">Movie</p>
            </li>
            <li><p class="classification">PG</p></li>
          </ul>
        </div>
        <p class="card_title">Beyond Earth</p>
      </div>
    </div>
  </div>`;
    //Selecionando os cards para alterar a imagem de fundo --------------------
  });
  //Criando
  let containersImagesTrending = document.querySelectorAll('.card_em_alta');
  arrayTrending.map((elemento, index) => {
    containersImagesTrending[
      index
    ].style.backgroundImage = `url("${elemento.thumbnail.trending.small}")`;
  });
  //!Criando os cards em Alta ---
  //!Criando os cards Recomendados ---
  arrayRecomendados.map((elemento, index) => {
    paiCardsRecomendados.innerHTML += `<div class="card_resultado">
    <div class="bookmark_container">
      <img src="./assets/icon-bookmark-empty.svg" alt="" class="bookmark_icon" />
    </div>
    <div class="container_imagem"></div>
    <div class="container_informacoes_recomendado">
      <div class="first_row">
        <p class="card_year">2019</p>
        <ul>
          <li>
            <img
              src="./assets/icon-category-movie.svg"
              alt=""
              class="category_icon"
            />
            <p class="category_name">Movie</p>
          </li>
          <li><p class="classification">PG</p></li>
        </ul>
      </div>
      <p class="card_title">Beyond Earth</p>
    </div>
  </div>`;
  });

  //!Criando os cards Recomendados ---
}

/* containersImagesAlta[
  index
].style.backgroundImage = `url("${elemento.thumbnail.trending.small}")`;
 */
