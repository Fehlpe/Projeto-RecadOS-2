"use strict";
let userHTML = document.getElementById('user');
let emailHTML = document.getElementById('email');
let password1HTML = document.getElementById('password1');
let password2HTML = document.getElementById('password2');
let btnSignUp = document.getElementById('btnSignUp');
let loggedRegister = sessionStorage.getItem('logged');
document.addEventListener('DOMContentLoaded', () => {
    checkLogged();
    function checkLogged() {
        if (loggedRegister) {
            window.location.href = "home.html";
            return;
        }
    }
});
btnSignUp.addEventListener('click', (e) => {
    e.preventDefault();
    let fieldsReturn = checkFields();
    let passwordReturn = checkPassword();
    if (passwordReturn && fieldsReturn) {
        signUpUser();
    }
});
function checkFields() {
    if (userHTML.value === '' || emailHTML.value === '' || password1HTML.value === '' || password2HTML.value === '') {
        alert("Preencha todos os campos!");
        return false;
    }
    else {
        return true;
    }
}
function checkPassword() {
    if (password1HTML.value.length < 4 && password2HTML.value.length < 4) {
        alert("As senhas devem ter no mínimo 4 caracteres");
        return false;
    }
    if (password1HTML.value !== password2HTML.value) {
        alert("Senhas não coincidem!");
        return false;
    }
    else {
        return true;
    }
}
function signUpUser() {
    let userList = searchStorageSignUp();
    let existingUser = userList.some((users) => users.email === emailHTML.value);
    if (existingUser) {
        alert("Usuário já Cadastrado!");
        return;
    }
    const newUser = {
        username: userHTML.value,
        email: emailHTML.value,
        password: password1HTML.value,
        notes: []
    };
    userList.push(newUser);
    updateStorage(userList);
    alert("Usuário cadastrado com sucesso!");
    window.location.href = "index.html";
}
function searchStorageSignUp() {
    return JSON.parse(localStorage.getItem('users') || "[]");
}
function updateStorage(userList) {
    localStorage.setItem('users', JSON.stringify(userList));
}
