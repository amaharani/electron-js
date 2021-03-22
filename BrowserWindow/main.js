const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

let win, dimWindow, colorWindow, framelessWindow;
let parentWindow, childWindow;

function createWindow() {
    /*
    win = new BrowserWindow();
    dimWindow = new BrowserWindow({width: 400, height: 400, maxWidth: 600, maxHeight: 600});
    colorWindow = new BrowserWindow({backgroundColor: '#000000'})
    framelessWindow = new BrowserWindow({backgroundColor: '#800000', frame: false});
        //frame: false = blank
    */
    parentWindow = new BrowserWindow();
    childWindow = new BrowserWindow({parent: parentWindow, title: 'Child', modal: true})
        //parent: parentWindow = duplicate parentWindow
        //modal : true = use that one first, closed this window so u may use other
    childWindow.loadURL('https://github.com/');
    childWindow.once('ready-to=show', () => {
        childWindow.show();
            //childWindow will not renderer > will be the url window
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (win == null) {
        createWindow()
    }
});