var btn = document.getElementById("btnType");
var types;
var products;
var sendModal = true;
var updateId;

function allProducts(url) {
    let request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send();
    return request.responseText;
}

function allTypes(url) {
    let request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send();
    return request.responseText;
}

function newLineType(type) {
    let option = document.createElement("option");

    option.innerHTML = type.name;

    return option;
}

function newLineTable(product) {
    let line = document.createElement("tr");
    let tdCode = document.createElement("td");
    let tdName = document.createElement("td");
    let tdType = document.createElement("td");
    let tdPrice = document.createElement("td");
    let tdInventory = document.createElement("td");
    let tdButtons = document.createElement("td");

    tdCode.innerHTML = product.id;
    tdName.innerHTML = product.name;
    tdType.innerHTML = product.type.name;
    tdPrice.innerHTML = product.price;
    tdInventory.innerHTML = product.inventory;
    tdButtons.innerHTML = addButtons(product.id);

    line.appendChild(tdCode);
    line.appendChild(tdName);
    line.appendChild(tdType);
    line.appendChild(tdPrice);
    line.appendChild(tdInventory);
    line.appendChild(tdButtons);

    return line;
}

function addButtons(id) {
    return "\
    <div>\
        <button type=\"button\" class=\"btn btn-warning\" data-bs-toggle=\"modal\" data-bs-target=\"#exampleModal\" onclick=\"javascript:updateProduct("+ id +");\">Atualizar</button>\
        <button type=\"button\" class=\"btn btn-danger\" onclick=\"javascript:deleteProduct("+ id +");\">Apagar</button>\
    </div>\
    ";
}

function modalCreate() {
    sendModal = true;
}

function createProduct(url, method) {
    // event.preventDefault(); // função usada para não dar reload na página
    
    let typeId;

    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let inventory = document.getElementById("storage").value;
    let typeForm = document.getElementById("select-type").value;

    types.forEach(type => {
        if (type.name == typeForm) {
            typeId = type.id
        }
    });

    bodyType = {
        "name": name,
        "price": price,
        "inventory": inventory,
        "type": { "id": typeId }
    }

    let request = new XMLHttpRequest();
    request.open(method, url, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(bodyType));

    request.onload = function() { 
        console.log(this.responseText)
    }

    return request.responseText;
}

function deleteProduct(id) {
    let __confirm = confirm("Deseja realmente excluir este produto?");

    if (__confirm) {
        products.forEach(product => {
            if (product.id == id) {
                deleteProductApi(id);
                alert("Produto deletado com sucesso!");
                window.location.reload(true);
            }
        });
    }
}

function updateProduct(id) {
    updateId = id;
    sendModal = false;

    products.forEach(product => {
        if (product.id == id) {
            $("#name").val(product.name);
            $("#price").val(product.price);
            $("#storage").val(product.inventory);
            $("#type").val(product.type.name);
        }
    });
    submitModal();
}

function deleteProductApi(id) {
    let url = "http://localhost:8080/product/" + id;
    let request = new XMLHttpRequest();
    request.open("DELETE", url, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send();

    request.onload = function() { 
        console.log(this.responseText)
    }

    return request.responseText;
}

function submitModal() {
    let url;
    let method;

    if (sendModal) {
        method = "POST";
        url = "http://localhost:8080/product";
    } else {
        method = "PUT";
        url = "http://localhost:8080/product/" + updateId;
    }

    createProduct(url, method);
}

function main() {
    // checkAuth()
    /**
     * Lista de todos os produts
    */
    let data = allProducts("http://localhost:8080/product");
    products = JSON.parse(data);
    let table = document.getElementById("table");

    products.forEach(product => {
        let line = newLineTable(product);
        table.appendChild(line);
    });

    /**
     * Lista de todos os tipos
    */
    let dataTypes = allTypes("http://localhost:8080/type");
    types = JSON.parse(dataTypes);

    let select = document.getElementById("select-type");

    types.forEach(type => {
        let line = newLineType(type);
        select.appendChild(line);
    });
}

// function checkAuth(){
//     if (localStorage.getItem('auth') === 'false') {
//         alert("É necessário logar-se para acessar essa página!");
//         alert("Você será redirecionado á página inical!")
//         window.location.href = "/index.html";
//     } 
// }

main()