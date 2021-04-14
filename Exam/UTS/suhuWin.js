// const BrowserWindow = require('electron').remote.BrowserWindow;
// const path = require('path');
// const url = require('url');

const KonversiWinBtn = document.getElementById('KonversiWinBtn');
KonversiWinBtn.addEventListener('click', function(event){
    let winKonversiSuhu;
    winKonversiSuhu = new BrowserWindow({
        width: 275,
        height: 350
    });
    winKonversiSuhu.loadURL(url.format({
        pathname: path.join(__dirname, 'suhu.html'),
        protocol: 'file',
        slashes: true
    }));
    // winKonversiSuhu.webContents.openDevTools();
});