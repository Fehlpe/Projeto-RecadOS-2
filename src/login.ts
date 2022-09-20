let emailLogin = document.getElementById('email') as HTMLInputElement;
let passwordLogin = document.getElementById('password') as HTMLInputElement;
let btnSignIn = document.getElementById('btnSignIn') as HTMLButtonElement;
let loggedLogin = sessionStorage.getItem('logged');

document.addEventListener('DOMContentLoaded', () => {
    checkLogged();

    function checkLogged(){
        if(loggedLogin) {
            window.location.href = "home.html";
            return;
        }
    }
});

btnSignIn.addEventListener('click', (e) => {
    e.preventDefault();

    let returnCheck = checkUser();

    if(returnCheck){
        window.location.href = "home.html"
    }

});

function checkUser(): Boolean{
    let userList = searchStorageSignIn();

    let existingUser = userList.some((users)=> 
        users.email === emailLogin.value && users.password === passwordLogin.value);
    
    if(existingUser){
        setLogged(emailLogin);
        return true
    } else {
        alert("E-mail ou senha inválidos");
        return false
    }
}

function setLogged(emailLogin:HTMLInputElement):void {
    sessionStorage.setItem('logged', emailLogin.value);
}

function searchStorageSignIn(): User[]{
    return JSON.parse(localStorage.getItem('users') || "[]");
}



