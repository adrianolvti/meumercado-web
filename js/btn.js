var campo;
var type;

function getName() {
    campo = document.getElementById('campo');
    localStorage.setItem('campo', campo.value);
}

function getType() {
    type = document.getElementById('type');
    localStorage.setItem('type', type.value);
}

