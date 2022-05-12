const formRegister = document.getElementById("form-register");

console.log(formRegister.usuario.placeholder);
console.log(formRegister.senha.placeholder);
console.log(formRegister.senha_confirmacao.placeholder);

formRegister.addEventListener("submit", registrar);

let usuariosBD = JSON.parse(localStorage.getItem("usuarios"));
if (usuariosBD === null) {
  usuariosBD = [];
  localStorage.setItem("usuarios", JSON.stringify(usuariosBD));
}

function registrar(event) {
  event.preventDefault();

  campoUsuario = formRegister.usuario.value;
  campoSenha = formRegister.senha.value;
  campoSenhaConfirmacao = formRegister.senha_confirmacao.value;

  if (campoSenha !== campoSenhaConfirmacao) {
    alert("As senha nao conferem");
    return;
  }

  usuarioJaCadastrado = usuariosBD.some((usuarios) => {
    return usuarios.usuario === campoUsuario;
  });
  senhaJaCadastrada = usuariosBD.some((usuarios) => {
    return usuarios.senha === campoSenha;
  });

  if (usuarioJaCadastrado) {
    alert("Usuario já cadastrado");
    return;
  }

  if (senhaJaCadastrada) {
    alert("Senha já cadastrada");
    return;
  }

  usuarioCadastrado = {
    id: idUsuario(),
    usuario: campoUsuario,
    senha: campoSenha,
  };

  usuariosBD.push(usuarioCadastrado);

  localStorage.setItem("usuarios", JSON.stringify(usuariosBD));
  alert("Usuario cadastrado com sucesso!");
  location.href = "./index.html";
}

function idUsuario() {
  usuariosBD = JSON.parse(localStorage.getItem("usuarios"));
  max = usuariosBD[0]?.id ?? 0;

  usuariosBD.forEach((usuario) => {
    if (usuario.id ?? 0 > max) {
      max = usuario.id;
    }
  });

  return max + 1;
}
