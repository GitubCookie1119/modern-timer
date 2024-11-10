// main.js
const { app, BrowserWindow, ipcMain, Menu, powerSaveBlocker } = require('electron');
const Path = require("path")
let sleepBlockerId = null;


let mainWindow = null;
app.on('ready', () => {
  // mainWindowを作成（windowの大きさや、Kioskモードにするかどうかなどもここで定義できる）
  sleepBlockerId = powerSaveBlocker.start('prevent-display-sleep');
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 700,
    webPreferences: {
      preload: `${app.getAppPath()}/preload.js`,
      icon: `${app.getAppPath()}/icon.png`,
      color: "#26292c"
    }
  });
  // Electronに表示するhtmlを絶対パスで指定（相対パスだと動かない）
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  Menu.setApplicationMenu(null);
});

app.on("window-all-closed", () => {
  powerSaveBlocker.stop(sleepBlockerId);
  if (process.platform !== 'darwin') {
    app.quit();
  }
})