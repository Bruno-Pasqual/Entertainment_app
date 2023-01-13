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
