const FormLogin = document.getElementById("form-login");
FormLogin.addEventListener("submit", logar);

usuariosCadastrados = JSON.parse(localStorage.getItem("usuarios"));

function logar(event) {
  event.preventDefault();
  if (usuariosCadastrados === null) {
    alert("Não existe nenhum usuário cadastrado");
    location.href = "./nova-conta.html";
  }
  campoUsuario = FormLogin.usuario.value;
  campoSenha = FormLogin.senha.value;

  const UsuarioEncontrado = usuariosCadastrados.find((usuario) => {
    return usuario.usuario === campoUsuario && usuario.senha === campoSenha;
  });
  console.log(UsuarioEncontrado?.id ?? -1);
  id = UsuarioEncontrado?.id ?? -1;

  if (UsuarioEncontrado) {
    location.href = "./home.html";
  } else {
    alert("usuario não encontrado");
    return;
  }

  setarUltimoLogin(id);
}

function setarUltimoLogin(id) {
  localStorage.setItem(
    "ultimoLogin",
    JSON.stringify({
      id: id,
      usuario: campoUsuario,
      senha: campoSenha,
    })
  );
}

const checkbox = document.getElementById("quadradim");
checkbox.addEventListener("click", manterLogado);

function manterLogado() {
  if (checkbox.checked) {
    localStorage.setItem("manterLogado", true);
  } else {
    localStorage.setItem("manterLogado", false);
  }

  keepLoggedIn = JSON.parse(localStorage.getItem("manterLogado"));
}

const body = document.querySelector("body");
body.setAttribute("onload", "pageReload()");

function pageReload() {
  keepLoggedIn = JSON.parse(localStorage.getItem("manterLogado"));

  if (keepLoggedIn) {
    preencherCampos();
    checkbox.setAttribute("checked", "true");
  } else {
    checkbox.getAttribute("checked", "false");
  }
}

function preencherCampos() {
  const teste = JSON.parse(localStorage.getItem("ultimoLogin"));

  FormLogin.usuario.value = teste.usuario;
  FormLogin.senha.value = teste.senha;
}

olhoSenha = document.getElementById("olho-senha");
olhoSenha.addEventListener("click", mostrarSenha);
function mostrarSenha() {
  FormLogin.senha.type =
    FormLogin.senha.type === "password" ? "text" : "password";
}

const btnCriarConta = document.getElementById("btnCriarConta");
btnCriarConta.addEventListener("click", () => {
  location.href = "./nova-conta.html";
});
