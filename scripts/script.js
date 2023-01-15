'use strict';
let dados = {};

//! Carregando dados do arquivo JSON e o atribuido a variável dados -----------

fetch('./data.json')
  .then((response) => response.json())
  .then((json) => {
    localStorage.setItem('dados', JSON.stringify(dados));
    dados = json;
    console.log(dados);
    comecaCodigo();
  });

function comecaCodigo() {
  //! Selecionando os primeiros elementos ----------------------------------
  const containerCardsEmAlta = document.getElementById(
    'container_cards_em_alta'
  );

  //! Variáveis ------------------------------------------------------------
  let cardsEmAlta = dados.filter((elemento, i) => {
    //todo --- Filter que irá criar um array contendo apenas os elementos com a propriedade "isTrending"
    if (elemento.isTrending) {
      return true;
    } else {
      return false;
    }
  });

  criaElementosFilhos(containerCardsEmAlta, cardsEmAlta);

  //! Fim da função começa código --
}

function criaElementosFilhos(pai, array) {
  array.map((elemento) => {
    pai.innerHTML += ` <div class="card_em_alta">
    <div class="bookmark_container">
      <img
        src="./assets/icon-bookmark-empty.svg"
        alt=""
        class="bookmark_icon"
      />
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
  });
}
