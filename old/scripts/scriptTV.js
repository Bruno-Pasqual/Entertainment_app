let tvObject = JSON.parse(localStorage.getItem('tvSeries'));

//! Seleção dos elementos -----------------------------------------------------
let recommendedCardsContainer = document.getElementById(
  'container_recommended_cards'
);

//! utilizando o array tvObject para rodar o loop for -------------------

for (i in tvObject) {
  recommendedCardsContainer.innerHTML += `<div class="recommended_card">
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

//! Seleção dos elementos -----------------------------------------------------

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

//! ----------------------------------------------------------------------------

for (let i = 0; i < tvObject.length; i++) {
  //todo, Nesse for, será utilizado o array de objetos "recommended" para alterar as informações de cada div criada nas linhas acima.

  imagensCardsRecomendados[
    i
  ].style.backgroundImage = `url('${tvObject[i].thumbnail.regular.small}')`;
  anosRecomendados[i].textContent = `${tvObject[i].year}`;
  if (tvObject[i].category === 'Movie') {
    iconesRecomendados[i].src = `./assets/icon-category-movie.svg`;
    categoryTags[i].textContent = 'Movie';
  } else {
    iconesRecomendados[i].src = `./assets/icon-category-tv.svg`;
    categoryTags[i].textContent = 'TV';
  }
  titulosRecomendados[i].textContent = `${tvObject[i].title}`;
}
