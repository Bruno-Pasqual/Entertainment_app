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
}

//! -------------------

function atualizaArrayFilmesETv() {
  //Atribuindo o array de objetos a variável dados --
  let dados = JSON.parse(sessionStorage.getItem('dados'));
  console.log(dados);
  //Utilizando o map para atualizar os 'arrayTV' e 'arrayFilmes'
  dados.map((objeto) => {
    if (objeto.isBookmarked) {
      objeto.category === 'Movie'
        ? arrayFilmes.push(objeto)
        : arrayTv.push(objeto);
    }
  });
  console.log(arrayFilmes);
  console.log(arrayTv);
}

function criaOsCards() {
  let containersPai = document.querySelectorAll(
    '.container_cards_recomendados'
  );
  console.log(containersPai);

  let arraytodos = [...arrayTv, ...arrayFilmes];
  containersPai[0].innerHTML = '';
  containersPai[1].innerHTML = '';

  //Criando os cards dos cards dos programas de tv bookmarked

  arrayTv.map((objeto) => {
    containersPai[0].innerHTML += `<div class="card_resultado">
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
      <img src="./assets/icon-bookmark-full.svg" alt="" class="bookmark_icon" />
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

function atualizaTodosBookmarks() {}

function habilitaBookmarks() {
  //! Selecionando os elementos ---------
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
  console.log(dados);
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

//! Estou tentando utilizar o título do container para acha-lo na variável dados, alterar o seu estado e depois atualizar a "nuvem" ainda não deu certo. !!
