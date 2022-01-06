const productForm = document.getElementById('productForm');

const {remote} = require('electron');
const { getConnection } = require('../database');
const main = remote.require('./main');

main.createProduct();

const productName = document.getElementById('name');
const productPrice = document.getElementById('price');
const productDescription = document.getElementById('description');
const productsList = document.getElementById("products")

let products = [];

productForm.addEventListener('submit', async(e)=>{
    e.preventDefault();

    const newProduct = {
        name: productName.value,
        price: productPrice.value,
        description: productDescription.value
    }



    const result = await main.createProduct(newProduct);
    console.log(result);

    getProducts();
});

function renderProducts(products){
    productsList.innerHTML = '';
    products.forEach(product => {
        productsList.innerHTML += `
        <div class="card card-body my-2 animate__animated animate__fadeInUp">
            <h4 class="capitalize">Producto:</br><strong><span>${product.name}</span></strong></h4>
            <p>Descripción:</br>${product.description}</p>
            <h3>Precio:</br><span>&#36;${product.price}</span></h3>
            <p>
                <button class="btn btn-outline-danger">
                    BORRAR
                </button>
                <button class="btn btn-outline-warning">
                    EDITAR
                </button>
            </p>
        </div>`;
    });
}

const getProducts = async () =>{
    products = await main.getProducts();
    renderProducts(products);
}



async function init(){
    await getProducts();
}

init();