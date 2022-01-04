const {BrowserWindow} = require('electron');

function hello(){
    console.log("Hello mundo");
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
    hello
};