"use strict";
const formRegister = document.getElementById("form-register");
formRegister.addEventListener("submit", registrar);
let usuariosBD = JSON.parse(localStorage.getItem("usuarios") || "[]");
function registrar(event) {
    event.preventDefault();
    const campoUsuario = formRegister.usuario.value;
    const campoSenha = formRegister.senha.value;
    const campoSenhaConfirmacao = formRegister.senha_confirmacao.value;
    if (campoSenha !== campoSenhaConfirmacao) {
        alert("As senha nao conferem");
        return;
    }
    const usuarioJaCadastrado = usuariosBD.some((usuarios) => {
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
function idUser() {
    var _a, _b;
    const usuariosBD = JSON.parse(localStorage.getItem("usuarios") || "[]");
    let max = (_b = (_a = usuariosBD[0]) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : 0;
    usuariosBD.forEach((usuario) => {
        var _a;
        if ((_a = usuario.id) !== null && _a !== void 0 ? _a : 0 > max) {
            max = usuario.id;
        }
    });
    return max + 1;
}
