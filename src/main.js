const {BrowserWindow, Notification} = require('electron');
const {getConnection} = require('./database');


async function createProduct(product){
    try {
        const conn = await getConnection();
        product.price = parseFloat(product.price);
        
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
    //console.log(results);
    new Notification({
        title:'Borrado de ítem',
        body:'Ítem eliminado correctamente de la base de datos.'
    }).show();
        //productForm.reset();
        //productName.focus();
    return results;
}

async function getProductById(id){

    const conn = await getConnection();
    const result = await conn.query('SELECT * FROM product WHERE id = ?', id);
    
    return result[0];

}

async function updateProduct(id, product){
    const conn = await getConnection();
    const result = await conn.query('UPDATE product SET ? WHERE id = ?',[product, id]);
    new Notification({
        title:'Modificaciones',
        body:'Ítem editado correctamente.'
    }).show();
    //console.log(result);
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
    deleteProduct,
    getProductById,
    updateProduct
};