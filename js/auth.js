var password = localStorage.getItem('password');

// function userApi(uri = null, methodApi, bodyApi = null) {
//     fetch("http://localhost:8080/user" + uri, {
//         method: methodApi,
//         headers: { 'Content-Type': 'application/json;charset=UTF-8' },
//         body: bodyApi
//         //  JSON.stringify({ "password": password })
//     })
//         .then(response => response.json())
//         .then(jsonResponse => checkAuth(jsonResponse));
// }

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

// function isLogged() {
//     userApi("/is-logged", "GET")
// }

// @GetMapping("/is-logged")
// public ResponseEntity<Object> isLogged() {
//     return ResponseEntity.status(HttpStatus.OK).body(userService.isLogged());
// }

// @PutMapping("/login")
// public ResponseEntity<Object> login(@RequestBody @Valid UserDto userDto) {
//     return ResponseEntity.status(HttpStatus.OK).body(userService.login(userDto));
// }

// @PutMapping("/logout")
// public ResponseEntity<Object> logout() {
//     return ResponseEntity.status(HttpStatus.OK).body(userService.logout());
// }

auth()