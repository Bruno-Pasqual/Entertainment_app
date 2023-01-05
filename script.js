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
  const cardsTrending = document.querySelectorAll('.trending_card');
  const yearsOfTrending = document.querySelectorAll('.year');
  // console.log(dados);

  //todo --  cria array dos itens que estão na categoria trending. ----
  let trending = [];
  dados.map((item) => {
    if (item.isTrending) {
      trending.push(item);
    }
  });
  console.log(trending);
  //todo -- ---------------------------------
  console.log(cardsTrending);
  for (let i = 0; i < trending.length; i++) {
    cardsTrending[
      i
    ].style.backgroundImage = `url('${trending[i].thumbnail.trending.small}')`;
    yearsOfTrending[i].textContent = `${trending[i].year}`;
  }
  // cardsTrending.forEach((card, index) => {
  //   card.style.backgroundImage = `url('${trending[index].thumbnail.trending.small}')`;
  // });

  //! Começando o código -------------
}
