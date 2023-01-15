'use strict';
let dados = {};

//! Carregando dados do arquivo JSON e o atribuido a variável dados -----------

fetch('./data.json')
  .then((response) => response.json())
  .then((json) => {
    console.log(localStorage.getItem('jaso'));
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
  const containerCardsRecomendados = document.getElementById(
    'container_cards_recomendados'
  );
  const searchInput = document.getElementById('search_input');
  const containerAlta = document.getElementById('container_em_alta');
  const containerRecomendado = document.getElementById('container_recomendado');
  const containerCardsResultado = document.getElementById(
    'container_cards_resultado'
  );
  const containerResultadoPesquisa = document.getElementById(
    'container_resultado_pesquisa'
  );

  //! Declarando funções -----------------------------------------------
  function checaPesquisa() {
    containerCardsResultado.innerHTML = '';
    console.log(searchInput.value);
    if (searchInput.value.length != 0) {
      containerAlta.style.display = 'none';
      containerRecomendado.style.display = 'none';
      containerResultadoPesquisa.style.display = 'flex';
      let arrayResultado = dados.filter((elemento, index) => {
        if (elemento.title.includes(searchInput.value)) {
          return true;
        } else {
          return false;
        }
      });
      arrayResultado.forEach((elemento, index) => {
        containerCardsResultado.innerHTML += `<div class="card_resultado">
        <div class="bookmark_container">
          <img src="./assets/icon-bookmark-empty.svg" alt="" class="bookmark_icon" />
        </div>
        <div class="container_imagem_resultado"></div>
        <div class="container_informacoes_recomendado">
          <div class="first_row">
            <p class="card_year">${elemento.year}</p>
            <ul>
              <li>
                <img
                  src="./assets/icon-category-${
                    elemento.category === 'Movie' ? 'movie' : 'tv'
                  }.svg"
                  alt=""
                  class="category_icon"
                />
                <p class="category_name">${elemento.category}</p>
              </li>
              <li><p class="classification">${elemento.rating}</p></li>
            </ul>
          </div>
          <p class="card_title">${elemento.title}</p>
        </div>
      </div>`;
      });

      //todo Selecionando as divs resultado e alterando a imagem das mesmas.
      let containerImagensResultado = document.querySelectorAll(
        '.container_imagem_resultado'
      );
      containerImagensResultado.forEach((container, index) => {
        container.style.backgroundImage = `url("${arrayResultado[index].thumbnail.regular.small}")`;
      });
    } else {
      containerAlta.style.display = 'flex';
      containerRecomendado.style.display = 'flex';
      containerResultadoPesquisa.style.display = 'none';
      console.log('aqui');
    }
  }
  //! Declarando funções -----------------------------------------------

  //! Variáveis ------------------------------------------------------------
  let arrayCardsEmAlta = [];
  let arrayCardsRecomendados = [];
  //! Variáveis ------------------------------------------------------------

  dados.forEach((elemento) => {
    //todo Loop que irá separar os objetos  do array "dados" para dentro dos arrays "arrayCardsEmAlta" e "arrayCardsRecomendados" de acordo com o a propriedades "isTrending"
    elemento.isTrending
      ? arrayCardsEmAlta.push(elemento)
      : arrayCardsRecomendados.push(elemento);
  });

  // Argumentos (elemento pai, array)
  criaCardsEmAlta(containerCardsEmAlta, arrayCardsEmAlta);
  criaCardsGenericos(containerCardsRecomendados, arrayCardsRecomendados);
  searchInput.addEventListener('input', checaPesquisa);

  //! Fim da função começa código --
}

//! Funções para criação dos cards "EmAlta" e "Genericos" ----------------------
function criaCardsEmAlta(pai, array) {
  //todo -- Função que irá receber 2 parâmetros, o elemento pai e o array que será usado para criar os elementos e também as informações que irão alterar as informações dos mesmos.

  // let cards = ['card_uso_geral', 'card_em_alta'];
  console.log(pai.classList.contains('container_cards_em_alta'));

  array.map((elemento, index) => {
    //Criando os cards de acordo com a quantidade e com as informações dos objetos dentro do array.

    pai.innerHTML += ` <div class="${
      elemento.isTrending === true ? 'card_em_alta' : 'card_uso_geral'
    }">
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
            <p class="card_year">${elemento.year}</p>
            <ul>
              <li>
                <img
                  src="./assets/icon-category-${
                    elemento.category === 'Movie' ? 'movie' : 'tv'
                  }.svg"
                  alt=""
                  class="category_icon"
                />
                <p class="category_name">${elemento.category}</p>
              </li>
              <li><p class="classification">${elemento.rating}</p></li>
            </ul>
          </div>
          <p class="card_title">${elemento.title}</p>
        </div>
      </div>
    </div>`;

    //Selecionando os cards criados e alterando a sua imagem de fundo
  });

  //todo -- Loop que irá selecionar todos os cards criados dentro do container "Trending" e irá utilizar os objetos dentro do array "arrayCardsEmAlta" para trocar as imagens de fundo.
  let cardsEmAlta = document.querySelectorAll('.card_em_alta');
  console.log(cardsEmAlta);
  cardsEmAlta.forEach((card, index) => {
    card.style.backgroundImage = `url("${array[index].thumbnail.trending.small}")`;
  });
}

function criaCardsGenericos(pai, array) {
  console.log(array[0]);
  array.map((elemento, index) => {
    pai.innerHTML += `<div class="card_uso_geral">
    <div class="bookmark_container">
      <img
        src="./assets/icon-bookmark-empty.svg"
        alt=""
        class="bookmark_icon"
      />
    </div>
    <div class="container_imagem"></div>
    <div class="container_informacoes_recomendado">
      <div class="first_row">
        <p class="card_year">${elemento.year}</p>
        <ul>
          <li>
            <img
              src="./assets/icon-category-${
                elemento.category === 'Movie' ? 'movie' : 'tv'
              }.svg"
              alt=""
              class="category_icon"
            />
            <p class="category_name">${elemento.category}</p>
          </li>
          <li><p class="classification">${elemento.rating}</p></li>
        </ul>
      </div>
      <p class="card_title">${elemento.title}</p>
    </div>
  </div>`;
  });

  //todo -- Loop que irá selecionar todas os cards de imagens e irá os alterar de acordo com os objetos dentro do array "arrayCardsRecomendados"
  const containersImagesCardGeral =
    document.querySelectorAll('.container_imagem');
  containersImagesCardGeral.forEach((card, index) => {
    card.style.backgroundImage = `url("${array[index].thumbnail.regular.small}")`;
  });
}
