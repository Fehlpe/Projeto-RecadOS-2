"use strict";
let loggedHome = sessionStorage.getItem('logged');
const userList = JSON.parse(localStorage.getItem('users') || '[]');
const btnForm = document.querySelector("#novo-recado-submit");
const newNoteTitleInput = document.querySelector("#titulo-novo-recado-input");
const newNoteInput = document.querySelector("#novo-recado-input");
const elementList = document.querySelector("#recados");
const btnLogout = document.getElementById("logout");
const titleWithName = document.getElementById("titulo-home");
document.addEventListener('DOMContentLoaded', () => {
    if (!loggedHome) {
        window.location.href = "index.html";
        return;
    }
    let userList = searchAllUsers();
    let user = userList.find((valor) => valor.email == loggedHome);
    titleWithName.innerHTML = `Olá, <span>${user.username}</span> `;
    user.notes.forEach((recado) => montarRecado(recado));
});
function searchAllUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
}
btnLogout.addEventListener('click', () => {
    sessionStorage.removeItem('logged');
    document.location.reload();
});
btnForm.addEventListener('click', (e) => {
    e.preventDefault();
    if (newNoteInput.value == '' || newNoteTitleInput.value == '') {
        alert("Preencha todos os campos do novo recado!");
        return;
    }
    salvarRecado();
});
function salvarRecado() {
    let recado = newNoteInput.value;
    let tituloRecado = newNoteTitleInput.value;
    const novoRecado = {
        title: tituloRecado,
        description: recado,
        id: Math.floor(Math.random() * Date.now())
    };
    let user = findUser();
    user.notes.push(novoRecado);
    atualizarDadosUsuario(user);
    montarRecado(novoRecado);
}
function findUser() {
    let userList = searchAllUsers();
    return userList.find((valor) => valor.email == loggedHome);
}
function atualizarDadosUsuario(dadosAtualizados) {
    let userList = searchAllUsers();
    let indiceUsuarioEncontrado = userList.findIndex((valor) => valor.email === dadosAtualizados.email);
    userList[indiceUsuarioEncontrado] = dadosAtualizados;
    atualizarStorage(userList);
}
function atualizarStorage(userList) {
    localStorage.setItem('users', JSON.stringify(userList));
}
function montarRecado(novoRecado) {
    let titulo = novoRecado.title;
    let recado = novoRecado.description;
    const elementoRecado = document.createElement("div");
    elementoRecado.classList.add("recado", "p-2", "mb-2", "mt-3", "d-flex", "flex-row");
    elementoRecado.setAttribute('id', `${novoRecado.id}`);
    const conteudoRecado = document.createElement("div");
    conteudoRecado.classList.add("conteudo-recado", "d-flex", "flex-row");
    elementoRecado.appendChild(conteudoRecado);
    const inputRecado = document.createElement("textarea");
    inputRecado.classList.add("texto-recado");
    inputRecado.value = recado;
    inputRecado.setAttribute("readonly", "readonly");
    inputRecado.setAttribute("oninput", "auto_height(this)");
    const inputTitulo = document.createElement("textarea");
    inputTitulo.classList.add("titulo-recado");
    inputTitulo.value = titulo;
    inputTitulo.setAttribute("readonly", "readonly");
    inputTitulo.setAttribute("oninput", "auto_height(this)");
    conteudoRecado.appendChild(inputTitulo);
    conteudoRecado.appendChild(inputRecado);
    const botoesRecado = document.createElement("div");
    botoesRecado.classList.add("botoes-recado", "d-flex", "justify-content-between", "flex-row");
    const botaoEditarRecado = document.createElement("button");
    botaoEditarRecado.classList.add("editar-recado");
    botaoEditarRecado.innerHTML = "EDITAR";
    const botaoDeletarRecado = document.createElement("button");
    botaoDeletarRecado.classList.add("deletar-recado");
    botaoDeletarRecado.innerHTML = "DELETAR";
    botoesRecado.appendChild(botaoEditarRecado);
    botoesRecado.appendChild(botaoDeletarRecado);
    elementoRecado.appendChild(botoesRecado);
    elementList.appendChild(elementoRecado);
    botaoEditarRecado.addEventListener('click', () => editarRecado(botaoEditarRecado, inputTitulo, inputRecado, novoRecado.id));
    botaoDeletarRecado.addEventListener('click', () => apagarRecado(novoRecado.id));
}
;
function editarRecado(botaoEditarRecado, inputTitulo, inputRecado, id) {
    let user = findUser();
    let recadoEspecifico = user.notes.findIndex((recado) => recado.id === id);
    if (botaoEditarRecado.innerText.toLocaleLowerCase() == "editar") {
        inputRecado.removeAttribute("readonly");
        inputRecado.focus();
        inputTitulo.removeAttribute("readonly");
        inputTitulo.focus();
        botaoEditarRecado.innerText = "SALVAR";
    }
    else {
        inputRecado.setAttribute("readonly", "readonly");
        inputTitulo.setAttribute("readonly", "readonly");
        botaoEditarRecado.innerText = "EDITAR";
        let novoInput = inputRecado.value;
        let novoTitulo = inputTitulo.value;
        user.notes[recadoEspecifico].description = novoInput;
        user.notes[recadoEspecifico].title = novoTitulo;
        atualizarDadosUsuario(user);
    }
}
function apagarRecado(id) {
    let user = findUser();
    let recadoEspecifico = user.notes.findIndex((recado) => recado.id === id);
    let linhaRecado = document.getElementById(`${id}`);
    let confirma = confirm(`Você realmente deseja apagar esse recado?`);
    if (confirma) {
        linhaRecado.remove();
        user.notes.splice(recadoEspecifico, 1);
        atualizarDadosUsuario(user);
    }
    else {
        return;
    }
}
function auto_height(elem) {
    elem.style.height = "1px";
    elem.style.height = (elem.scrollHeight) + "px";
}
