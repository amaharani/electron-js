const electron = require("electron");
const path = require("path");
const url = require("url");
const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWin;

process.env.NODE_ENV = 'production';

app.on('ready', function(){
    mainWin = new BrowserWindow({
        width: 1000,
        height: 650,
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    });
    mainWin.loadURL(url.format({
        pathname: path.join(__dirname,'main.html'),
        protocol: 'file',
        slashes: true
    }));
    // mainWin.webContents.openDevTools();
    mainWin.on('closed', () => {
        app.quit();
    });

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

ipcMain.on('item:add', function(e, item){
    console.log(item);
    mainWin.webContents.send('item:add', item);
});

const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Dev Tools',
                click(){
                    mainWin.webContents.openDevTools();
                }
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];

if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}

if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu:[
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    })
}