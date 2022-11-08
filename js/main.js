

function allProducts(url) {
    let request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send();
    return request.responseText;
}

function newLineTable(product) {
    let line = document.createElement("tr");
    let tdCode = document.createElement("td");
    let tdName = document.createElement("td");
    let tdType = document.createElement("td");
    let tdPrice = document.createElement("td");
    let tdInventory = document.createElement("td");

    tdCode.innerHTML = product.id;
    tdName.innerHTML = product.name;
    tdType.innerHTML = product.type.name;
    tdPrice.innerHTML = product.price;
    tdInventory.innerHTML = product.inventory;

    line.appendChild(tdCode);
    line.appendChild(tdName);
    line.appendChild(tdType);
    line.appendChild(tdPrice);
    line.appendChild(tdInventory);

    return line;
}

function main() {
    let data = allProducts("http://localhost:8080/product");
    let products = JSON.parse(data);
    let table = document.getElementById("table");

    products.forEach(product => {
        let line = newLineTable(product);
        table.appendChild(line);
    });
}

main()