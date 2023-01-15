'use strict';
let dados = {};

//! Carregando dados do arquivo JSON e o atribuido a variável dados -----------

fetch('./data.json')
  .then((response) => response.json())
  .then((json) => {
    dados = json;
    let paginaAtiva = JSON.parse(localStorage.getItem('paginaAtiva'));
    comecaCodigo();
  });

function comecaCodigo() {
  console.log(dados);
}
