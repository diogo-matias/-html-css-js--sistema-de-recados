const FormLogin = document.getElementById("form-login") as HTMLFormElement;
FormLogin.addEventListener("submit", logar);

const usuariosCadastrados = JSON.parse(
  localStorage.getItem("usuarios") || "[]"
);

function logar(event: any) {
  const campoUsuario = FormLogin.usuario.value;
  const campoSenha = FormLogin.senha.value;
  event.preventDefault();
  if (usuariosCadastrados == "[]") {
    alert("Não existe nenhum usuário cadastrado");
    location.href = "./nova-conta.html";
  }

  const UsuarioEncontrado = usuariosCadastrados.find((usuario: any) => {
    return usuario.usuario === campoUsuario && usuario.senha === campoSenha;
  });
  const id = UsuarioEncontrado?.id ?? -1;

  if (UsuarioEncontrado) {
    location.href = "./home.html";
  } else {
    alert("usuario não encontrado");
    return;
  }

  setarUltimoLogin(id, campoUsuario, campoSenha);
}

function setarUltimoLogin(id: number, usuario: string, senha: string) {
  localStorage.setItem(
    "ultimoLogin",
    JSON.stringify({
      id: id,
      usuario,
      senha,
    })
  );
}

const checkbox = document.getElementById("quadradim") as HTMLInputElement;
checkbox.addEventListener("click", manterLogado);

function manterLogado() {
  if (checkbox.checked) {
    localStorage.setItem("manterLogado", "true");
  } else {
    localStorage.setItem("manterLogado", "false");
  }

  // const keepLoggedIn = JSON.parse(localStorage.getItem("manterLogado") || "");
}

const body = document.querySelector("body") as HTMLElement;
body.setAttribute("onload", "pageReload()");

function pageReload() {
  const keepLoggedIn = JSON.parse(localStorage.getItem("manterLogado") || "[]");

  if (keepLoggedIn) {
    preencherCampos();
    checkbox.setAttribute("checked", "true");
  } else {
    checkbox.getAttribute("checked");
  }
}

function preencherCampos() {
  const UltimoLogin = JSON.parse(localStorage.getItem("ultimoLogin") || "[]");

  if (UltimoLogin.usuario === undefined) {
    return;
  }

  FormLogin.usuario.value = UltimoLogin.usuario;
  FormLogin.senha.value = UltimoLogin.senha;
}

const olhoSenha = document.getElementById("olho-senha") as HTMLElement;
olhoSenha.addEventListener("click", mostrarSenha);
function mostrarSenha() {
  FormLogin.senha.type =
    FormLogin.senha.type === "password" ? "text" : "password";
}

const btnCriarConta = document.getElementById("btnCriarConta") as HTMLElement;
btnCriarConta.addEventListener("click", () => {
  location.href = "./nova-conta.html";
});
