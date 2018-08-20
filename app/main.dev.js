/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, BrowserWindow,Menu,Tray,nativeImage } from 'electron';
const electron = require('electron');
import MenuBuilder from './menu';
const path = require('path');
var iconpath = path.join(__dirname, '..', 'resources', 'icon.ico');
let mainWindow = null;
let childWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    width: 400,
    height: 700,
    frame: true,
    center:true,
    alwaysOnTop: false,
    maximizable: false,
    minimizable: true,
    fullscreenable: false,
    radii: [5,5,5,5],
    resizable:false,
    skipTaskbar: false,
    titleBarStyle: 'hiddenInset',
    vibrancy: 'dark',
    show: false,
    transparent: true,
    icon: iconpath
  });

  let nimage = nativeImage.createFromPath(iconpath);
  var appIcon = new Tray(nimage);

  var contextMenu = Menu.buildFromTemplate([
      {
          label: 'Show App', click: function () {
              mainWindow.show();
          }
      },
      {
          label: 'Quit', click: function () {
              app.isQuiting = true
              app.quit();
          }
      }
  ])

  appIcon.setContextMenu(contextMenu);

 mainWindow.on('show', function () {
    appIcon.setHighlightMode('always')
  })



  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    localStorage.removeItem('reduxState');
    mainWindow = null;
  });



  mainWindow.on('minimize', (event) => {
  event.preventDefault();
   const displays = electron.screen.getAllDisplays();
   console.log(displays);
   const width=displays[0].size.width-220;
   const height=displays[0].size.height-115;
   mainWindow.hide();

    childWindow = new BrowserWindow({
    width: 200,
    height: 40,
    x:width,
    y:height,
    frame: false,
    alwaysOnTop: true,
    movable:false,
    resizable:false,
    maximizable: false,
    minimizable: false,
    fullscreenable: false,
    radii: [5,5,5,5],
    skipTaskbar: true,
    titleBarStyle: 'hiddenInset',
    vibrancy: 'dark',
    show: false,
    transparent: true,
    icon: iconpath
    });

    childWindow.loadURL(`file://${__dirname}/app.html`);
    childWindow.show();

  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
});
