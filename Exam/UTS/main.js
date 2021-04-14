const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");

let mainWin;

function createWindow(){
    mainWin = new BrowserWindow({
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        },
        width: 400,
        height: 400
    });
    mainWin.loadURL(url.format({
        pathname: path.join(__dirname,'main.html'),
        protocol: 'file',
        slashes: true
    }));
    // mainWin.webContents.openDevTools();
    mainWin.on('closed', () => {
        mainWin = null;
    });
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit();
    }
});

app.on('activate', () => {
    if(mainWin == null){
        createWindow();
    }
});