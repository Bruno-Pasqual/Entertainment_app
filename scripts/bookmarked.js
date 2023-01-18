'use strict';
let arrayFilmes = [];
let arrayTv = [];
let dados = [];
comecaScript();

function comecaScript() {
  atualizaArrayFilmesETv();
  console.log(arrayTv);
  criaOsCards();
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

  //Criando os cards dos cards dos programas de tv bookmarked

  arrayTv.map((objeto) => {
    containersPai[0].innerHTML += `<div class="card_resultado">
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
              src="./assets/icon-category-tv.svg"
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
    containersPai[1].innerHTML += `<div class="card_resultado">
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
              src="./assets/icon-category-tv.svg"
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
}
