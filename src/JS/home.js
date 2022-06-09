"use strict";
const usuario = JSON.parse(localStorage.getItem("ultimoLogin") || "[]");
const idUsuario = usuario.id;
const nomeUsuario = usuario.usuario;
const tabela = document.getElementById("tabela");
const descricao = document.getElementById("addDescricao");
const detalhamento = document.getElementById("addDetalhamento");
const formInformacoes = document.querySelector("form");
const sectionPrincipal = document.getElementById("sectionPrincipal");
let idElemento = 0;
if (usuario.length === 0) {
    alert("Nenhum ususario encontrado");
    location.href = "./login.html";
}
// PEGANDO INFORMAÇÕES DA TABELA NO LOCAL STORAGE
function getLocalStorage() {
    let infosBD = JSON.parse(localStorage.getItem(`infos${nomeUsuario}`) || "[]");
    return infosBD;
}
function setLocalStorage(infosBD) {
    localStorage.setItem(`infos${nomeUsuario}`, JSON.stringify(infosBD));
}
function salvar(event) {
    event.preventDefault();
    if (!descricao.value && !detalhamento.value) {
        alert("Preencha pelo menos um campo");
        return;
    }
    const infos = getLocalStorage();
    const informacoes = {
        id: definirID(),
        descricao: descricao.value,
        detalhamento: detalhamento.value,
    };
    infos.push(informacoes);
    setLocalStorage(infos);
    descricao.value = "";
    detalhamento.value = "";
    // ACIONANDO A LINHA NO HTML DA TABELA
    carregarHTMLTabela();
}
function carregarHTMLTabela() {
    //  PRIMEIRA LINHA
    tabela.innerHTML = `  <tbody id="tbody">
  <tr class="primeira_linha_tabela" id="linha_1">
  <td style="width: 5vw">#</td>
  <td style="width: 20vw">Descrição</td>
  <td style="width: 30vw">Detalhamento</td>
  <td style="width: 15vw">Ação</td>
  </tr>
  </tbody>`;
    // LINHAS EDITADAS PELO USUARIO
    getLocalStorage().forEach((linha, index) => {
        tabela.innerHTML += `
    <tr class="linha">
          <td>${index + 1}</td>
          <td>
              <input
              type="text"
              name ="${linha.id}" 
              class="input" 
              value= "${linha.descricao}"
              disabled/>
          </td>
          <td>
            <input
            name ="${linha.id}"
            type="text"
            class="input"
            value="${linha.detalhamento}"
            disabled
          />
          </td>
          <td style="width: 15vw">
                <button class="btn editar" name="${linha.id}">Editar</button>
                <button class="btn apagar" name="${linha.id}">Deletar</button>
          </td>
     </tr>
     
    `;
    });
    const linhas = document.querySelectorAll(".linha");
    linhas.forEach((linha) => linha.addEventListener("click", apagarOuEditar));
}
function apagarOuEditar(click) {
    const linhaElementos = document.getElementsByName(click.target.name);
    idElemento = click.target.name;
    const infosBD = getLocalStorage();
    const indexElement = infosBD.findIndex((elemento) => elemento.id == idElemento);
    if (click.target.className === "btn editar") {
        if (click.target.textContent === "Editar") {
            estiloInputHabilitado(linhaElementos[0]);
            estiloInputHabilitado(linhaElementos[1]);
            linhaElementos[2].textContent = "Salvar";
            linhaElementos[3].textContent = "Descartar";
            return;
        }
        if (click.target.textContent === "Salvar") {
            estiloPadrao(linhaElementos[0]);
            salvarDescricao(linhaElementos[0], indexElement);
            estiloPadrao(linhaElementos[1]);
            salvarDestalhamento(linhaElementos[1], indexElement);
            linhaElementos[2].textContent = "Editar";
            linhaElementos[3].textContent = "Deletar";
        }
    }
    if (click.target.textContent === "Descartar") {
        estiloPadrao(linhaElementos[0]);
        estiloPadrao(linhaElementos[1]);
        carregarHTMLTabela();
    }
    if (click.target.textContent !== "Descartar") {
        if (click.target.className === "btn apagar") {
            adicionarHTMLConfirmacao();
        }
    }
}
function salvarDescricao(elemento, indexElement) {
    const infosBD = getLocalStorage();
    infosBD[indexElement].descricao = `${elemento.value}`;
    setLocalStorage(infosBD);
}
function salvarDestalhamento(elemento, indexElement) {
    const infosBD = getLocalStorage();
    infosBD[indexElement].detalhamento = `${elemento.value}`;
    setLocalStorage(infosBD);
}
function estiloPadrao(elemento) {
    elemento.setAttribute("disabled", "true");
    elemento.setAttribute("class", "input");
}
function estiloInputHabilitado(elemento) {
    elemento.removeAttribute("disabled");
    elemento.setAttribute("class", "input input_habilitado ");
}
descricao;
function adicionarHTMLConfirmacao() {
    const HTMLConfirmacao = document.createElement("div");
    HTMLConfirmacao.setAttribute("class", "confirmacao");
    HTMLConfirmacao.setAttribute("id", "confirmacao-modal");
    HTMLConfirmacao.innerHTML = ` 
  
  <div class="container-confirmacao">
    <div class="container-texto-confirmacao">
      <h1>TEM CERTEZA</h1>
      <p>que deseja deletar?</p>
    </div>
    <button id="btnSimConfirmacao" class="botao botao-confirmacao green-bg"> SIM </button>
    <button id="btnNaoConfirmacao" class="botao botao-confirmacao red-bg"> NÃO </button>
  </div>
  `;
    sectionPrincipal.appendChild(HTMLConfirmacao);
    confirmacao();
}
function confirmacao() {
    const btnSim = document.getElementById("btnSimConfirmacao");
    btnSim.addEventListener("click", () => {
        sectionPrincipal.removeChild(HTMLConfirmacao);
        // REMOVE O ELEMENTO SELECIONADO
        const infosBD = getLocalStorage();
        const indexElement = infosBD.findIndex((elemento) => elemento.id == idElemento);
        infosBD.splice(indexElement, 1);
        setLocalStorage(infosBD);
        carregarHTMLTabela();
    });
    const btnNao = document.getElementById("btnNaoConfirmacao");
    btnNao.addEventListener("click", () => sectionPrincipal.removeChild(HTMLConfirmacao));
    const HTMLConfirmacao = document.getElementById("confirmacao-modal");
}
function definirID() {
    const infosBD = getLocalStorage();
    let max = 0;
    infosBD.forEach((info) => {
        if (info.id > max) {
            max = info.id;
        }
    });
    return max + 1;
}
carregarHTMLTabela();
formInformacoes.addEventListener("submit", salvar);
