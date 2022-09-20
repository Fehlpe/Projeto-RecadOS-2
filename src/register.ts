let userHTML = document.getElementById('user') as HTMLInputElement;
let emailHTML = document.getElementById('email') as HTMLInputElement;
let password1HTML = document.getElementById('password1') as HTMLInputElement;
let password2HTML = document.getElementById('password2') as HTMLInputElement;
let btnSignUp = document.getElementById('btnSignUp') as HTMLButtonElement;
let loggedRegister = sessionStorage.getItem('logged');

document.addEventListener('DOMContentLoaded', () => {
    checkLogged();

    function checkLogged(){
        if(loggedRegister) {
            window.location.href = "home.html";
            return;
        }
    }
});

interface Note{
    title: string,
    description: string,
    id: number
}

interface User{
    username:string,
    email: string,
    password: string,
    notes: Note[]
}

btnSignUp.addEventListener('click', (e) => {
    e.preventDefault();

    let fieldsReturn = checkFields();
    let passwordReturn = checkPassword();

    if(passwordReturn && fieldsReturn){
        signUpUser();
    } 

});

function checkFields(): Boolean{
    if(userHTML.value==='' || emailHTML.value==='' || password1HTML.value==='' || password2HTML.value===''){
        alert("Preencha todos os campos!");
        return false
    } else {
        return true
    }

}

function checkPassword(): Boolean{
    
    if(password1HTML.value.length<4 && password2HTML.value.length<4){
        alert("As senhas devem ter no mínimo 4 caracteres");
        return false
    }

    if(password1HTML.value!==password2HTML.value){
        alert("Senhas não coincidem!");
        return false
    } else {
        return true
    }
}

function signUpUser(){

    let userList = searchStorageSignUp();

    let existingUser = userList.some((users) => users.email === emailHTML.value);

    if(existingUser){
        alert("Usuário já Cadastrado!");
        return
    }

    const newUser: User = {
        username:userHTML.value,
        email:emailHTML.value,
        password:password1HTML.value,
        notes: []
    }

    userList.push(newUser);
    updateStorage(userList);

    alert("Usuário cadastrado com sucesso!");
    window.location.href = "index.html";

}

function searchStorageSignUp(): User[]{
    return JSON.parse(localStorage.getItem('users') || "[]");
}

function updateStorage(userList: User[]): void{
    localStorage.setItem('users', JSON.stringify(userList));
}