var password = localStorage.getItem('password');

function auth() {

    fetch("http://localhost:8080/user", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        body: JSON.stringify({ "password": password })
    })
        .then(response => response.json())
        .then(jsonResponse => checkAuth(jsonResponse));
}

function checkAuth(jsonResponse) {
     if (jsonResponse == false) {
        alert("Senha inválida!");
        alert("Você será redirecionado á página inical!")
        window.location.href = "/index.html";
    }
}

auth()