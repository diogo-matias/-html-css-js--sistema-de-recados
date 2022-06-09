const formRegister = document.getElementById(
  "form-register"
) as HTMLFormElement;
formRegister.addEventListener("submit", registrar);

let usuariosBD = JSON.parse(localStorage.getItem("usuarios") || "[]");

function registrar(event: any) {
  event.preventDefault();

  const campoUsuario = formRegister.usuario.value;
  const campoSenha = formRegister.senha.value;
  const campoSenhaConfirmacao = formRegister.senha_confirmacao.value;

  if (campoSenha !== campoSenhaConfirmacao) {
    alert("As senha nao conferem");
    return;
  }

  const usuarioJaCadastrado = usuariosBD.some((usuarios: any) => {
    return usuarios.usuario === campoUsuario;
  });

  if (usuarioJaCadastrado) {
    alert("Usuario já cadastrado");
    return;
  }

  const usuarioCadastrado = {
    id: idUser(),
    usuario: campoUsuario,
    senha: campoSenha,
  };

  usuariosBD.push(usuarioCadastrado);

  localStorage.setItem("usuarios", JSON.stringify(usuariosBD));
  alert("Usuario cadastrado com sucesso!");
  location.href = "./login.html";
}

function idUser(): any {
  const usuariosBD = JSON.parse(localStorage.getItem("usuarios") || "[]");
  let max = usuariosBD[0]?.id ?? 0;

  usuariosBD.forEach((usuario: any) => {
    if (usuario.id ?? 0 > max) {
      max = usuario.id;
    }
  });

  return max + 1;
}
