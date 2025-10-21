"use strict";

window.onload = init;

function init() {
    fetchProducts();
}

/* hämta in produkter från Fake store API */
function fetchProducts() {
    fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(data => writeProducts(data))
        .catch(error => console.log("Det blev ett fel! Felmeddelande: " + error))
}

/*Skriv ut produkter till produktvyn*/
function writeProducts(products) {
    const productListEl = document.getElementById("productList");

    productListEl.innerHTML = "";

    // Loppa igenom produkter och skriv ut till DOM
    products.forEach(product => {
        const articleEl = document.createElement("article");
        articleEl.className = "product";

        // skapa element
        const title = document.createElement("h2");
        const category = document.createElement("p");
        const price = document.createElement("p");

        // skriv ut info
        title.innerHTML = product.title;
        category.innerHTML = product.category;
        price.innerHTML = "$" + product.price;

        // lägg till i article i DOM
        articleEl.appendChild(title);
        articleEl.appendChild(category);
        articleEl.appendChild(price);

        productListEl.appendChild(articleEl);

        articleEl.addEventListener("click", function() {
            fetchProductDetail(product.id);
        })
    });
}

/* Hämta in detaljerad info om en produkt*/
function fetchProductDetail(id) {
        fetch("https://fakestoreapi.com/products/" + id)
        .then(res => res.json())
        .then(data => writeProductDetail(data))
        .catch(error => console.log("Det blev ett fel! Felmeddelande: " + error))

}

/* Skriv ut produkt detalj till detaljvy */
function writeProductDetail(product) {
    console.log(product);

    const productDetailEl = document.getElementById("productDetail");
    productDetailEl.innerHTML = `<img src="${product.image}"
                        alt="${product.title}">
                    <h2>${product.title}</h2>
                    <p><strong>Kategori:</strong> ${product.category}</p>
                    <p><strong>Pris:</strong> $${product.price}</p>
                    <p><strong>Beskrivning:</strong> ${product.description}</p>`;
}