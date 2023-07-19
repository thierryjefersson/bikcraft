// Ativar Links do Menu
const links = document.querySelectorAll(".header-menu a");

links.forEach((link) => {
  const url = document.location.href;
  const { href } = link;
  if (url.includes(href)) link.classList.add("ativo");
});

// Ativar Items do Orçamento
const parametros = new URLSearchParams(window.location.search);

parametros.forEach((parametro) => {
  const elemento = document.getElementById(parametro);
  if (elemento) elemento.checked = true;
});

// Perguntas Frequentes
const perguntas = document.querySelectorAll(".perguntas button");

function ativarPergunta({ currentTarget }) {
  const controls = currentTarget.getAttribute("aria-controls");
  const resposta = document.getElementById(controls);

  resposta.classList.toggle("ativa");
  const ativa = resposta.classList.contains("ativa");
  currentTarget.setAttribute("aria-expanded", ativa);
}

perguntas.forEach((pergunta) => {
  pergunta.addEventListener("click", ativarPergunta);
});

// Galeria de Bicicletas
const galeria = document.querySelectorAll(".bicicleta-imagens img");
const galeriaContainer = document.querySelector(".bicicleta-imagens");

function trocarImagem({ currentTarget }) {
  const img = currentTarget; 
  if (matchMedia("(min-width: 1000px)").matches) {
    galeriaContainer.prepend(img);
  }
}

galeria.forEach((img) => {
  img.addEventListener("click", trocarImagem);
});

// Funcionamento da loja

class Funcionamento {
  constructor(funcionamento, activeClass) {
    this.funcionamento = document.querySelector(funcionamento);
    this.activeClass = activeClass;
  }

  dadosFuncionamento() {
    this.diasSemana = this.funcionamento.dataset.semana.split(",").map(Number);
    this.horarioSemana = this.funcionamento.dataset.horario
      .split(",")
      .map(Number);
  }

  dadosAgora() {
    this.dataAgora = new Date();
    this.diaAgora = this.dataAgora.getDay();
    this.horarioAgora = this.dataAgora.getUTCHours() - 3;
  }

  estaAberto() {
    const semanaAberto = this.diasSemana.indexOf(this.diaAgora) !== -1;
    const horarioAberto =
      this.horarioAgora >= this.horarioSemana[0] &&
      this.horarioAgora < this.horarioSemana[1];
    return semanaAberto && horarioAberto;
  }

  ativaAberto() {
    if (this.estaAberto()) this.funcionamento.classList.add(this.activeClass);
  }

  init() {
    if (this.funcionamento) {
      this.dadosFuncionamento();
      this.dadosAgora();
      this.ativaAberto();
    }
    return this;
  }
}
const funcionamentoSP = new Funcionamento("[data-sp]", "aberto");
const funcionamentoRJ = new Funcionamento("[data-rj]", "aberto");
funcionamentoSP.init();
funcionamentoRJ.init();