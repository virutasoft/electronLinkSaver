const {BrowserWindow, Notification} = require('electron');
const {getConnection} = require('./database');


async function createProduct(product){
    try {
        const conn = await getConnection();
        product.price = parseFloat(product.price);
        console.log(product);
        const result = await conn.query('INSERT INTO product SET ?', product);
        console.log(result);
        new Notification({
           title: 'Electron & MySQL' ,
           body: 'Nuevo producto agregado satisfactoriamente.'
        }).show();
    } catch (error) {
        console.log(error)
    }
}


let window;
function createWindow(){
    window = new BrowserWindow({
        width: 800,
        height: 600,
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
    createProduct
};