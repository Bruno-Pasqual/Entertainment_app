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
  const cardsTrending = document.querySelectorAll('.trending_card');
  const yearsOfTrending = document.querySelectorAll('.year');
  const containerInfoType = document.querySelectorAll('.container_category');
  const tituloConteudoTrends = document.querySelectorAll('.nome_conteudo');

  // console.log(dados);

  //todo --  cria array dos itens que estão na categoria trending. ----
  let trending = [];
  dados.map((item) => {
    if (item.isTrending) {
      trending.push(item);
    }
  });
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
}

//continuar
