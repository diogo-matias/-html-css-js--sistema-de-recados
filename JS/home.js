// PEGANDO INFORMACOES USUARIO
const usuario = JSON.parse(localStorage.getItem("ultimoLogin"));
idUsuario = usuario.id;
nomeUsuario = usuario.usuario;
console.log(nomeUsuario);

// PEGANDO INFORMAÇÕES DA TABELA NO LOCAL STORAGE

function getLocalStorage() {
  let infosBD = JSON.parse(localStorage.getItem(`infos${nomeUsuario}`));

  if (infosBD === null) {
    infosBD = [];
  }

  setLocalStorage(infosBD);
  return infosBD;
}

function setLocalStorage(infosBD) {
  localStorage.setItem(`infos${nomeUsuario}`, JSON.stringify(infosBD));
}

const tabela = document.getElementById("tabela");

const descricao = document.getElementById("addDescricao");
const detalhamento = document.getElementById("addDetalhamento");

const formInformacoes = document.querySelector("form");
formInformacoes.addEventListener("submit", salvar);

console.log(getLocalStorage());

function salvar(event) {
  event.preventDefault();
  infos = getLocalStorage();
  const informacoes = {
    id: infos.length + 1,
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
    tabela.innerHTML += ` <tr class="linha">
    <td>${index + 1}</td>
    <td>
    <input type="text" name ="${index + 1}" class="input" value= "${
      linha.descricao
    }" disabled />
    </td>
    <td>
    <input
    name ="${index + 1}"
    type="text"
    class="input"
    value="${linha.detalhamento}"
    disabled
    />
    </td>
    <td style="width: 15vw">
    <button class="btn editar" name="${
      index + 1
    }">Editar</button> <button class="btn apagar" name="${
      index + 1
    }">Deletar</button>
    </td>
    </tr>`;
  });

  const linhas = document.querySelectorAll(".linha");
  linhas.forEach((linha) => linha.addEventListener("click", apagarOuEditar));
}
carregarHTMLTabela();

let linha = 0;
function salvarDescricao(elemento) {
  infosBD = getLocalStorage();
  infosBD[linha - 1].descricao = `${elemento.value}`;
  setLocalStorage(infosBD);
}
function salvarDestalhamento(elemento) {
  infosBD = getLocalStorage();
  infosBD[linha - 1].detalhamento = `${elemento.value}`;
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

let contadorCliques = 0;
function apagarOuEditar(click) {
  const linhaElementos = document.getElementsByName(click.target.name);
  linha = click.target.name;

  if (click.target.className === "btn editar") {
    contadorCliques++;

    if (click.target.textContent === "Editar") {
      estiloInputHabilitado(linhaElementos[0]);
      estiloInputHabilitado(linhaElementos[1]);

      linhaElementos[2].textContent = "Salvar";
      linhaElementos[3].textContent = "Descartar";
      return;
    }

    console.log;
    if (click.target.textContent === "Salvar") {
      estiloPadrao(linhaElementos[0]);
      salvarDescricao(linhaElementos[0]);

      estiloPadrao(linhaElementos[1]);
      salvarDestalhamento(linhaElementos[1]);

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

// function recuperarElementos() {
//   const btnSim = document.getElementById("btnSimConfirmacao");
//   btnNao = document.getElementById("btnNaoConfirmacao");
// }

function adicionarHTMLConfirmacao() {
  const sectionPrincipal = document.getElementById("sectionPrincipal");

  const HTMLConfirmacao = document.createElement("div");
  HTMLConfirmacao.setAttribute("class", "confirmacao");
  HTMLConfirmacao.innerHTML = ` 
  
  <div class="container-confirmacao">
    <div class="container-texto-confirmacao">
      <h1>TEM CERTEZA</h1>
      <p>que deseja deletar?</p>
    </div>
    <button
      id="btnSimConfirmacao"
      class="botao botao-confirmacao green-bg"
    >
      SIM
    </button>
    <button id="btnNaoConfirmacao" class="botao botao-confirmacao red-bg">
      NÃO
    </button>
  </div>

  `;

  sectionPrincipal.appendChild(HTMLConfirmacao);

  function confirmacao() {
    usuarioConfirmado = false;

    const btnSim = document.getElementById("btnSimConfirmacao");
    btnSim.addEventListener("click", confirmado);

    btnNao = document.getElementById("btnNaoConfirmacao");
    btnNao.addEventListener("click", negado);

    function confirmado() {
      console.log("confirmado");

      sectionPrincipal.removeChild(HTMLConfirmacao);

      infosBD = getLocalStorage();
      infosBD.splice(linha - 1, 1);
      setLocalStorage(infosBD);
      carregarHTMLTabela();
    }

    function negado() {
      console.log("negado");
      sectionPrincipal.removeChild(HTMLConfirmacao);
    }
  }
  confirmacao();
}
