// PEGANDO INFORMAÇÕES NO LOCAL STORAGE
let infosBD = JSON.parse(localStorage.getItem("infosBD"));
if (infosBD === null) {
  infosBD = [];
}

const tabela = document.getElementById("tabela");
const tbody = document.getElementById("tbody");

const btnSalvar = document.getElementById("btnSalvar");
const descricao = document.getElementById("addDescricao");
const detalhamento = document.getElementById("addDetalhamento");

btnSalvar.addEventListener("click", salvar);

function salvar() {
  const informacoes = {
    id: infosBD.length + 1,
    descricao: descricao.value,
    detalhamento: detalhamento.value,
  };
  infosBD.push(informacoes);

  localStorage.setItem("infosBD", JSON.stringify(infosBD));
  // ACIONANDO A LINHA NO HTML DA TABELA

  carregarHTMLTabela();
}

function carregarHTMLTabela() {
  tabela.innerHTML = `  <tbody id="tbody">
  <tr class="primeira_linha_tabela" id="linha_1">
  <td style="width: 5vw">#</td>
  <td style="width: 20vw">Descrição</td>
  <td style="width: 30vw">Detalhamento</td>
  <td style="width: 15vw">Ação</td>
  </tr>
  </tbody>`;

  let infosBD = JSON.parse(localStorage.getItem("infosBD"));
  infosBD.forEach((linha, index) => {
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

  linhas.forEach((linha) => {
    return linha.addEventListener("click", apagarOuEditar);
  });
  console.log(linhas);
}
carregarHTMLTabela();

function apagarOuEditar(click) {
  const linhaElementos = document.getElementsByName(click.target.name);
  const linha = click.target.name;

  function novoEstilo(event) {
    event.target.setAttribute("disabled", "true");
    event.target.setAttribute("class", "input");
  }

  function salvarDescricao(event) {
    console.log(event.target.value);

    infosBD = JSON.parse(localStorage.getItem("infosBD"));
    infosBD[linha - 1].descricao = `${event.target.value}`;
    localStorage.setItem("infosBD", JSON.stringify(infosBD));
  }
  function salvarDestalhamento(event) {
    console.log(event.target.value);
    console.log("salvarDestalhamento");

    infosBD = JSON.parse(localStorage.getItem("infosBD"));
    infosBD[linha - 1].detalhamento = `${event.target.value}`;
    localStorage.setItem("infosBD", JSON.stringify(infosBD));
  }

  if (click.target.className === "btn editar") {
    linhaElementos[0].removeAttribute("disabled");
    linhaElementos[0].setAttribute("class", "input input_habilitado ");
    linhaElementos[0].addEventListener("blur", novoEstilo);
    linhaElementos[0].addEventListener("blur", salvarDescricao);

    linhaElementos[1].removeAttribute("disabled");
    linhaElementos[1].setAttribute("class", "input input_habilitado ");
    linhaElementos[1].addEventListener("blur", novoEstilo);
    linhaElementos[1].addEventListener("blur", salvarDestalhamento);

    console.log(linhaElementos);
    console.log(linhaElementos[2].textContent);

    linhaElementos[2].textContent = "Salvar";
    linhaElementos[3].textContent = "Descartar";
  }

  if (click.target.className === "btn apagar") {
    infosBD = JSON.parse(localStorage.getItem("infosBD"));
    infosBD.splice(linha - 1, 1);
    localStorage.setItem("infosBD", JSON.stringify(infosBD));
    carregarHTMLTabela();
  }
}
