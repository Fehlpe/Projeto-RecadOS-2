"use strict";
let emailLogin = document.getElementById('email');
let passwordLogin = document.getElementById('password');
let btnSignIn = document.getElementById('btnSignIn');
let loggedLogin = sessionStorage.getItem('logged');
document.addEventListener('DOMContentLoaded', () => {
    checkLogged();
    function checkLogged() {
        if (loggedLogin) {
            window.location.href = "home.html";
            return;
        }
    }
});
btnSignIn.addEventListener('click', (e) => {
    e.preventDefault();
    let returnCheck = checkUser();
    if (returnCheck) {
        window.location.href = "home.html";
    }
});
function checkUser() {
    let userList = searchStorageSignIn();
    let existingUser = userList.some((users) => users.email === emailLogin.value && users.password === passwordLogin.value);
    if (existingUser) {
        setLogged(emailLogin);
        return true;
    }
    else {
        alert("E-mail ou senha inválidos");
        return false;
    }
}
function setLogged(emailLogin) {
    sessionStorage.setItem('logged', emailLogin.value);
}
function searchStorageSignIn() {
    return JSON.parse(localStorage.getItem('users') || "[]");
}
