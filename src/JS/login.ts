const body = document.querySelector("body") as HTMLElement;
const olhoSenha = document.getElementById("olho-senha") as HTMLElement;
const btnCriarConta = document.getElementById("btnCriarConta") as HTMLElement;
const formLogin = document.getElementById("form-login") as HTMLFormElement;
const checkbox = document.getElementById("quadradim") as HTMLInputElement;
const usuariosCadastrados = JSON.parse(
  localStorage.getItem("usuarios") || "[]"
);

function logar(event: any) {
  event.preventDefault();
  const campoUsuario = formLogin.usuario.value;
  const campoSenha = formLogin.senha.value;
  const usuarioEncontrado = usuariosCadastrados.find((usuario: any) => {
    return usuario.usuario === campoUsuario && usuario.senha === campoSenha;
  });

  if (usuariosCadastrados === []) {
    alert("Não existe nenhum usuário cadastrado");
    location.href = "./nova-conta.html";
  }

  if (!usuarioEncontrado) {
    alert("usuario não encontrado");
    return;
  }

  location.href = "./home.html";

  localStorage.setItem("ultimoLogin", JSON.stringify(usuarioEncontrado));
}

function manterLogado() {
  if (checkbox.checked) {
    localStorage.setItem("manterLogado", "true");
  } else {
    localStorage.setItem("manterLogado", "false");
  }

  // const keepLoggedIn = JSON.parse(localStorage.getItem("manterLogado") || "");
}

function pageReload() {
  const keepLoggedIn = JSON.parse(localStorage.getItem("manterLogado") || "");

  if (keepLoggedIn) {
    preencherCampos();
    checkbox.setAttribute("checked", "true");
  } else {
    checkbox.getAttribute("checked");
  }
}

function preencherCampos() {
  const ultimoLogin = JSON.parse(localStorage.getItem("ultimoLogin") || "[]");

  if (!ultimoLogin.usuario) {
    return;
  }

  formLogin.usuario.value = ultimoLogin.usuario;
  formLogin.senha.value = ultimoLogin.senha;
}

function mostrarSenha() {
  formLogin.senha.type =
    formLogin.senha.type === "password" ? "text" : "password";
}

body.setAttribute("onload", "pageReload()");
olhoSenha.addEventListener("click", mostrarSenha);
formLogin.addEventListener("submit", logar);
btnCriarConta.addEventListener("click", () => {
  location.href = "./nova-conta.html";
});
checkbox.addEventListener("click", manterLogado);
