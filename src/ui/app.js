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

    productForm.reset();
    productName.focus();

    await getProducts();
});

async function deleteProduct(id){
    const response = await confirm('Está seguro de borrar el elemento?');
    if (response) {
        await main.deleteProduct(id);
        
        await getProducts();
        
    }
    return;


    
};

async function editProduct(id){
    const product = await main.getProductById(id);
    productName.value = product.name;
    productDescription.value = product.description;
    productPrice.value = product.price;
};


function renderProducts(products){
    productsList.innerHTML = '';
    products.forEach(product => {
        productsList.innerHTML += `
        <div class="card border-light my-2  mb-3 animate__animated animate__fadeInUp">
        <div class="card-header">
            Tarjeta de producto
        </div>
        <div class="card-body">
        <h3 class="card-title text-info">Producto:</h3>
        <h3 class="">${product.name}</h3>
          <p class="card-text"><span class="text-info my-0">Descripción:</span></br>${product.description}</p>
          <h3 class="card-text text-info">Precio:</br><span>&#36;${product.price}</span></h3>
          <p>
          <p class="card-text">
              <button class="btn btn-outline-danger" onclick="deleteProduct('${product.id}');">
                  BORRAR
              </button>
              <button class="btn btn-outline-warning" onclick="editProduct('${product.id}');">
                  EDITAR
              </button>
          </p>
          
        </div>
      </div>
        `;
        // <div class="card card-body my-2 animate__animated animate__fadeInUp">
        //     <h4 class="capitalize">Producto:</br><strong><span>${product.name}</span></strong></h4>
        //     <p>Descripción:</br>${product.description}</p>
        //     <h3>Precio:</br><span>&#36;${product.price}</span></h3>
        //     <p>
        //         <button class="btn btn-outline-danger">
        //             BORRAR
        //         </button>
        //         <button class="btn btn-outline-warning">
        //             EDITAR
        //         </button>
        //     </p>
        // </div>`;
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