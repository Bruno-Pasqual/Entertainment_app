dados = [];
movies = [];

//!Declarando as funções ----------------------------------

function comecaScript() {
  dados = JSON.parse(sessionStorage.getItem('dados'));
  console.log(dados);
  criaCards();
  atualizaBookmarks();
}

function criaCards() {
  let containerPai = document.getElementById('container_cards_recomendados');
  // ---
  movies = dados.filter((objeto) => {
    return objeto.category === 'Movie';
  });

  //! Criando os cards e ja usando o array de objeto "movies" para alterar suas informações
  movies.map((objeto) => {
    containerPai.innerHTML += `<div class="card_resultado">
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
              src="./assets/icon-category-${
                objeto.category === 'Movie' ? 'movie' : 'tv'
              }.svg"
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

  //Selecionando as divs que contêm as imagens dos cards e as alterando com a imagem correspondente.
  let cards = document.querySelectorAll('.container_imagem_resultado');
  movies.map((objeto, index) => {
    cards[
      index
    ].style.backgroundImage = `url("${objeto.thumbnail.regular.small}")`;
  });
}

function atualizaBookmarks() {
  let bookmarkIcons = document.querySelectorAll('.bookmark_icon');
  movies.map((objeto, index) => {
    if (objeto.isBookmarked === true) {
      bookmarkIcons[index].src = `./assets/icon-bookmark-full.svg`;
    } else {
      bookmarkIcons[index].src = `./assets/icon-bookmark-empty.svg`;
    }
  });
}

function atualizaBookmarkClicado() {
  let bookmarkContainers = document.querySelectorAll('.bookmark_container');
}

comecaScript();
