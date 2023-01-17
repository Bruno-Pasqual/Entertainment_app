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

//! Carregando dados do arquivo JSON e o atribuido a variável dados -----------

function comecaCodigo() {
  atualizaTrendingERecomendados();
  criaOsCards();
  selecionaosBookmark();

  //----------------------
}

function atualizaTrendingERecomendados() {
  dados = JSON.parse(sessionStorage.getItem('dados'));
  // console.log(dados);
  dados.map((elemento) => {
    elemento.isTrending
      ? arrayTrending.push(elemento)
      : arrayRecomendados.push(elemento);
  });

  // console.log(arrayTrending);
  // console.log(arrayRecomendados);
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
  //Selecionando os containers que estão na tela
  let containersBookmark = document.querySelectorAll('.bookmark_container');
  // console.log(containersBookmark);

  //Fazendo o loop para adicionar event listener em todos eles
  containersBookmark.forEach((container, index) => {
    container.addEventListener('click', () => {
      console.log(`Container ${index} clicado`);

      //! Caso o bookmark clicado seja da classe "Trending/emAlta" -->

      if (container.parentElement.classList.contains('card_em_alta')) {
        console.log(JSON.parse(sessionStorage.getItem('dados')));
        atualizaNuvem(
          container.parentElement.children[1].children[0].children[1]
            .textContent
        );
        console.log(JSON.parse(sessionStorage.getItem('dados')));
      } else if (container.parentElement.classList.contains('card_resultado')) {
        atualizaNuvem(
          container.parentElement.children[2].children[1].textContent
        );
      }
    });
  });
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
