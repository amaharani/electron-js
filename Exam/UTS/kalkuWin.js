const BrowserWindow = require('electron').remote.BrowserWindow;
const path = require('path');
const url = require('url');

const KalkulatorWinBtn = document.getElementById('KalkulatorWinBtn');
KalkulatorWinBtn.addEventListener('click', function(event){
    let winKalkulator;
    winKalkulator = new BrowserWindow({
        width: 275,
        height: 350
    });
    winKalkulator.loadURL(url.format({
        pathname: path.join(__dirname, 'kalku.html'),
        protocol: 'file',
        slashes: true
    }));
    // winKalkulator.webContents.openDevTools();
});