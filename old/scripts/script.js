'use strict';
let dados = {};

//! Carregando dados do arquivo JSON e o atribuido a variável dados -----------

fetch('./data.json')
  .then((response) => response.json())
  .then((json) => {
    dados = json;
    console.log(window.location.pathname.endsWith('index.html'));
    let paginaAtiva = JSON.parse(localStorage.getItem('paginaAtiva'));
    console.log(paginaAtiva);
    comecaCodigo();
  });

//!começando o código -------------------------------------------------------

function comecaCodigo() {
  //! Fazendo a seleção dos elementos -----------------

  // ----------------------- Seleção dos elementos card trending

  let trendingContainer = document.getElementById('trending_container');
  let cardsTrending = document.querySelectorAll('.trending_card');
  const yearsOfTrending = document.querySelectorAll('.year');
  const containerInfoType = document.querySelectorAll('.container_category');
  const tituloConteudoTrends = document.querySelectorAll('.nome_conteudo');

  // -------------------- Seleção dos elementos cards recomendados

  const recommendedContainer = document.getElementById('container_recomendado');
  const containerRecommendedCards = document.getElementById(
    'container_recommended_cards'
  );

  // ------------------------------------------ seleção dos elementos Input
  const pesquisaInput = document.getElementById('search_input');
  const containerResultado = document.getElementById(
    'container_resultado_busca'
  );
  let navIcons = document.querySelectorAll('.nav_icon');

  //! Fim da seleção dos elementos -----------------

  //! Começando a lógica do código ---------------------------------------------

  // console.log(dados);

  //todo --  cria dois array e organiza os objetos separando-os entre os que tem a propriedade isTrending como true ou false ----

  if (!JSON.parse(localStorage.getItem('arrayBookmarked'))) {
    let bookmarked = [];
  }
  let trending = [];
  let recommended = [];
  let movies = [];
  let tvSeries = [];
  let bookmarked = [];
  console.log(JSON.parse(localStorage.getItem('arrayBookmarked')));

  dados.map((item) => {
    if (item.isTrending) {
      trending.push(item);
    } else {
      recommended.push(item);
    }
  });

  dados.map((item) => {
    if (item.category == 'Movie') {
      movies.push(item);
    } else {
      tvSeries.push(item);
    }
  });

  //! Salvando arrays no localStorage ---------------------------

  localStorage.setItem('movies', JSON.stringify(movies));
  localStorage.setItem('tvSeries', JSON.stringify(tvSeries));
  localStorage.setItem('paginaAtiva', 1);

  // Mudando a variável de página ativa no localStorage
  navIcons.forEach((elemento, index) => {
    elemento.addEventListener('click', () => {
      if (index === 0 || index === 1) {
        localStorage.setItem('paginaAtiva', 1);
      } else if (index === 2) {
        localStorage.setItem('paginaAtiva', 2);
      } else if (index === 3) {
        localStorage.setItem('paginaAtiva', 3);
      } else if (index === 4) {
        localStorage.setItem('paginaAtiva', 4);
      }
    });
  });

  //! Salvando arrays no localStorage ---------------------------

  console.log(dados);
  console.log(navIcons);

  //todo -- --------------------- Altera as informações dos container de trending (deixar automático)

  for (let i = 0; i < trending.length; i++) {
    //todo --- for que irá utilizar os objetos dentro do array "trending" para modificar as suas divs.

    if (trending[i].category === 'Movie') {
      containerInfoType[i].innerHTML = `
      <img src="./assets/icon-category-movie.svg" alt="icone filme" />
      <p class="type_content_text">Movie</p>
      `;
    } else {
      containerInfoType[i].innerHTML = `
      <img src="./assets/icon-category-tv.svg" alt="icone tipo de conteúdo" />
  <p class="type_content_text">TV</p></p>
      `;
    }

    cardsTrending[
      i
    ].style.backgroundImage = `url('${trending[i].thumbnail.trending.small}')`;
    yearsOfTrending[i].textContent = `${trending[i].year}`;
    tituloConteudoTrends[i].textContent = `${trending[i].title}`;
  }

  //! Gerando os cards "recomendados" -----------------------------------------

  for (let i = 0; i < recommended.length; i++) {
    containerRecommendedCards.innerHTML += `<div class="recommended_card">
    <div class="recommended_card_img"></div>
    <div class="recommended_details_container">
      <!-- Primeira linha -->
      <div class="recommended_first_row">
        <p class="recommended_year">2019</p>
        <ul>
          <il class="recommended_card_category_container">
            <img
              src="./assets/icon-category-movie.svg"
              alt="movie category icon"
              class="recommmended_category_icon"
            />
            <p class="recommended_category_name">Movie</p>
          </il>
          <il><p class="recommended_classification">E</p></il>
        </ul>
      </div>
      <!-- Fim Primeira linha -->
      <p class="recommended_title">The Great Lands</p>
    </div>
    <div class="container_bookmark">
    <img
      src="./assets/icon-bookmark-empty.svg"
      alt=""
      class="botao_bookmark"
    />
  </div>
    </div> `;
  }
  //! Seleção dos elementos dos cards recomendados ----------------------------

  const cardsRecomendados = document.querySelectorAll('.recommended_card');
  const imagensCardsRecomendados = document.querySelectorAll(
    '.recommended_card_img'
  );
  const anosRecomendados = document.querySelectorAll('.recommended_year');
  const iconesRecomendados = document.querySelectorAll(
    '.recommmended_category_icon'
  );
  const categoryTags = document.querySelectorAll('.recommended_category_name');
  const titulosRecomendados = document.querySelectorAll('.recommended_title');

  //! Estilização dos cards recomendados-------- ----------------------------

  for (let i = 0; i < cardsRecomendados.length; i++) {
    //todo, Nesse for, será utilizado o array de objetos "recommended" para alterar as informações de cada div criada nas linhas acima.

    imagensCardsRecomendados[
      i
    ].style.backgroundImage = `url('${recommended[i].thumbnail.regular.small}')`;
    anosRecomendados[i].textContent = `${recommended[i].year}`;
    if (recommended[i].category === 'Movie') {
      iconesRecomendados[i].src = `./assets/icon-category-movie.svg`;
      categoryTags[i].textContent = 'Movie';
    } else {
      iconesRecomendados[i].src = `./assets/icon-category-tv.svg`;
      categoryTags[i].textContent = 'TV';
    }
    titulosRecomendados[i].textContent = `${recommended[i].title}`;
  }

  //! Pesquisa  ------------------------------------------------------

  pesquisaInput.addEventListener('input', () => {
    //todo -- Aqui será feita a verificação se alguma coisa foi digitada no campo de pesquisa, caso tenha sido,  os container 'trending' e 'recomendado' serão escondidos, e o container "resultado_pesquisa" será revelado. Dentro desse, serão criadas divs, na quantidade correspondente ao número de objetos que atendem a busca, e estas, por fim, uilizarão as informações dos objetos.

    //! -------------------
    if (pesquisaInput.value.length === 0) {
      trendingContainer.style.display = `block`;
      recommendedContainer.style.display = 'flex';
      containerResultado.style.display = 'none';
    } else {
      trendingContainer.style.display = `none`;
      recommendedContainer.style.display = 'none';
      containerResultado.style.display = 'flex';

      let divsContem = [];
      containerResultado.innerHTML = '';

      for (let i = 0; i < dados.length; i++) {
        //todo -- For que irá criar divs "result_cards" genéricas na quantidade correta, para serem alteradas posteriormente.

        if (
          dados[i].title
            .toLowerCase()
            .includes(`${pesquisaInput.value.toLowerCase()}`)
        ) {
          divsContem.push(dados[i]);
          containerResultado.innerHTML += `<div class="result_card">
          <div class="result_card_img"></div>
          <div class="result_details_container">
            <div class="result_first_row">
              <p class="result_year">2019</p>
              <ul>
                <il class="result_card_category_container">
                  <img
                    src="./assets/icon-category-movie.svg"
                    alt="movie category icon"
                    class="result_category_icon"
                  />
                  <p class="result_category_name">Movie</p>
                </il>
                <il><p class="result_classification">E</p></il>
              </ul>
            </div>

            <p class="result_title">The Great Lands</p>
          </div>
        </div>`;
        }

        //2º ----

        // Último ----
        if (i === dados.length - 1) {
          console.log('-----------------------------');
          console.log(divsContem);
        }
      }

      //Colocar alterações das divs resultados aqui

      const cardsResultados = document.querySelectorAll('.result_card');
      const imagesResultados = document.querySelectorAll('.result_card_img');
      const anosResultados = document.querySelectorAll('.result_year');
      const categoriasResultados = document.querySelectorAll(
        '.result_category_name'
      );
      const classificacoesResultados = document.querySelectorAll(
        '.result_classification'
      );
      const nomesResultados = document.querySelectorAll('.result_title');
      const iconesCategoriaResultados = document.querySelectorAll(
        '.result_category_icon'
      );

      for (let i = 0; i < divsContem.length; i++) {
        //todo -- Loop for que irá interar sobre o array "divsContem" e irá alterar as informações dos "cardsResultados" com os objetos que estiverem lá.

        imagesResultados[
          i
        ].style.backgroundImage = `url('${divsContem[i].thumbnail.regular.small}')`;
        anosResultados[i].textContent = divsContem[i].year;
        categoriasResultados[i].textContent = divsContem[i].category;
        classificacoesResultados[i].textContent = divsContem[i].rating;
        nomesResultados[i].textContent = divsContem[i].title;
        if (divsContem[i].category === 'TV Series') {
          iconesCategoriaResultados[i].src = `./assets/icon-category-tv.svg`;
        } else {
          iconesCategoriaResultados[i].src = `./assets/icon-category-movie.svg`;
        }
      }
    }

    //! Lógica do bookmark ---------------------------------------------------
  });

  let containersBookmark = document.querySelectorAll('.container_bookmark');
  let bookmarkIcons = document.querySelectorAll('.botao_bookmark');
  containersBookmark.forEach((elemento, index) => {
    elemento.addEventListener('click', (event) => {
      /*      console.log(event.target.parentElement.childNodes); */
      let classeDoParent = containersBookmark[index].parentElement.className;

      //! If para verificar a seção do elemento clicado ------------------------

      //Caso seja a seção recomendado ------------
      if (classeDoParent === 'recommended_card') {
        //todo -- Condicional que irá verificar em qual seção do site o icone de bookmark foi clicado. Dessa forma é possível ajustar a busca pelo campo contendo o título do programa em questão (a depender da seção, o index para chegar até o elemento com o título muda, por isso o uso da condicional, do contrário estava ocorrendo erro.)

        let temp =
          containersBookmark[index].parentElement.childNodes[3].childNodes[7]
            .textContent;

        if (bookmarked.includes(temp)) {
          //todo -- Condicional que faz a verificação se o título do programa relacionado ao elemento clicado (bookmark) já se encontra dentro da lista de programas bookmarked (favoritados), caso se encontre, o programa irá remover o programa e tirar a marcação de favoritado, caso contrário, o mesmo irá ser adicionado.

          bookmarkIcons[index].src = `/assets/icon-bookmark-empty.svg`;
          bookmarked.filter((value, index) => {
            if (value === temp) {
              bookmarked.splice(index, 1);
              localStorage.setItem(
                'arrayBookmarked',
                JSON.stringify(bookmarked)
              );
              return true;
            }
            return false;
          });
        } else {
          bookmarkIcons[index].src = `/assets/icon-bookmark-full.svg`;
          bookmarked.push(temp);
          localStorage.setItem('arrayBookmarked', JSON.stringify(bookmarked));
        }
        //Caso seja a seção Trending ------------
      } else if (classeDoParent === 'trending_card') {
        let temp =
          containersBookmark[index].parentElement.childNodes[3].childNodes[3]
            .textContent;
        if (bookmarked.includes(temp)) {
          //! Inclui -------------------------
          bookmarkIcons[index].src = `/assets/icon-bookmark-empty.svg`;
          bookmarked.filter((value, index) => {
            if (value === temp) {
              bookmarked.splice(index, 1);
              localStorage.setItem(
                'arrayBookmarked',
                JSON.stringify(bookmarked)
              );
              return true;
            }
            return false;
          });
          //! Não inclui ---------------------
        } else {
          bookmarkIcons[index].src = `/assets/icon-bookmark-full.svg`;
          bookmarked.push(temp);
          localStorage.setItem('arrayBookmarked', JSON.stringify(bookmarked));
        }
      }
    });
  });
}

function realizaBusca() {}

//continuar

//Fazer no final
//todo Fazer com que o javascript crie o elemento do container is tRending, de forma que seja possível alterar o json e o programa já se adapte a essa modificação (atualmente as divs foram criadas manualmente, de forma que caso tenha mais filmes e/ou series do que o total de divs criadas, esses excedentes não aparecerão no container do "trending")