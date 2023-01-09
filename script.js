let dados = {};

//! Carregando dados do arquivo JSON e o atribuido a variável dados -----------

fetch('./data.json')
  .then((response) => response.json())
  .then((json) => {
    dados = json;
    comecaCodigo();
  });

//!começando o código -------------------------------------------------------

function comecaCodigo() {
  //! Fazendo a seleção dos elementos -----------------

  // ----------------------- Seleção dos elementos card trending

  const trendingContainer = document.getElementById('trending_container');
  const cardsTrending = document.querySelectorAll('.trending_card');
  const yearsOfTrending = document.querySelectorAll('.year');
  const containerInfoType = document.querySelectorAll('.container_category');
  const tituloConteudoTrends = document.querySelectorAll('.nome_conteudo');

  // -------------------- Seleção dos elementos cards recomendados

  const recommendedContainer = document.getElementById('container_recomendado');
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

  // ------------------------------------------ seleção dos elementos Input
  const pesquisaInput = document.getElementById('search_input');

  pesquisaInput.addEventListener('input', () => {
    //! -------------------
    if (pesquisaInput.value.length === 0) {
      trendingContainer.style.display = `block`;
      recommendedContainer.style.display = 'flex';
    } else {
      trendingContainer.style.display = `none`;
      recommendedContainer.style.display = 'none';
      let divsContem = [];

      for (let i = 0; i < dados.length; i++) {
        if (dados[i].title.includes(`${pesquisaInput.value}`)) {
          console.log(dados[i].title, true);
          divsContem.push(dados[i]);
        } else {
          console.log('título não incluí');
        }
        if (i === dados.length - 1) {
          console.log('-----------------------------');
        }
      }
      console.log(divsContem);

      divsContem.map((value, index) => {
        console.log(value.title);
      });
    }

    //! -------------------
  });
  //! Começando a lógica do código ---------------------------------------------

  // console.log(dados);

  //todo --  cria dois array e organiza os objetos de acordo se tem a propriedade isTrending como true ou false ----

  let trending = [];
  let recommended = [];

  dados.map((item) => {
    if (item.isTrending) {
      trending.push(item);
    } else {
      recommended.push(item);
    }
  });

  console.log(anosRecomendados);
  console.log(iconesRecomendados);
  console.log(titulosRecomendados);
  console.log(recommended);
  console.log(trending);
  console.log(cardsTrending);
  //todo -- --------------------- Altera as informações dos container de trending (deixar automático)

  for (let i = 0; i < trending.length; i++) {
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

  console.log(dados);
  for (let i = 0; i < cardsRecomendados.length; i++) {
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
}

function realizaBusca() {}

//continuar

//Fazer no final
//todo Fazer com que o javascript crie o elemento do container is tRending, de forma que seja possível alterar o json e o programa já se adapte a essa modificação (atualmente as divs foram criadas manualmente, de forma que caso tenha mais filmes e/ou series do que o total de divs criadas, esses excedentes não aparecerão no container do "trending")
