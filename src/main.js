const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');


let win;

const createWindow = () => {

  win = new BrowserWindow({
    width: 950,
    height: 1000,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.setMenu(null);

  const mainPage = url.format({
    protocol: 'file',
    pathname: path.join(__dirname, '../build/index.html'),
    slashes: true,
  });
  win.loadURL(mainPage);

  // win.webContents.openDevTools()

  win.on('closed', () => {
    win = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
