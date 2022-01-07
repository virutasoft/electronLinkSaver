const {BrowserWindow, Notification} = require('electron');
const {getConnection} = require('./database');


async function createProduct(product){
    try {
        const conn = await getConnection();
        product.price = parseFloat(product.price);
        console.log(product);
        const result = await conn.query('INSERT INTO product SET ?', product);

        new Notification({
           title: 'Electron & MySQL' ,
           body: 'Nuevo producto agregado satisfactoriamente.'
        }).show();

    product.id = result.insertId;
    return product;

    } catch (error) {
        console.log(error)
    }
}

async function getProducts(){
    const conn = await getConnection();
    const results = (await conn).query('SELECT * FROM product ORDER BY id DESC');
    //console.log(results);
    return results;
}

async function deleteProduct(id){
    const conn = await getConnection();
    const results = await conn.query('DELETE FROM product WHERE id= ?', id);
    console.log(results);
    new Notification({
        title:'Borrado de ítem',
        body:'Ítem eliminado correctamente de la base de datos.'
    }).show();
    productForm.reset();
        productName.focus();
    return results;
}

let window;
function createWindow(){
    window = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
            nodeIntegrationInWorker: true
        }
    });
    window.loadFile('src/ui/index.html');
}

module.exports ={

    createWindow,
    createProduct,
    getProducts,
    deleteProduct
};