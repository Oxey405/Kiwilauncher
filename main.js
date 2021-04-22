const { Menu, Tray, app, BrowserWindow } = require('electron');
require('update-electron-app')({
  repo: 'Oxey405/Kiwilauncher',
  updateInterval: '1 hour'
})
function createWindow () {
  // Cree la fenetre du navigateur.
  const win = new BrowserWindow({
    width: 300,
    height: 300,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule:true,
      devTools:false
    }
  })

  //Tray
  let tray = null ;
  app.whenReady().then(() => 
{
  tray = new Tray('logo256x.png');
  const contextMenu = Menu.buildFromTemplate([
    { label: 'KiwiLauncher', enabled: 'true', click: function() {
      const windowList = BrowserWindow.getAllWindows();
      if(windowList.length == 0) {
        const win = new BrowserWindow({
          width: 300,
          height: 300,
          frame: false,
          webPreferences: {
            nodeIntegration: true,
            enableRemoteModule:true
          }
        })
        win.loadFile('pages/loading.html');
        return;
      }
      window = windowList[0];
      window.show();
      window.focus();
    }},
    { label: 'Leave a star in GitHub', enabled: 'true' },
    { label: 'Stop KiwiLauncher', enabled: 'true', click: function() {
      app.quit();
    }}
    
  ])
  tray.setToolTip('KiwiLauncher Tray')
  tray.setContextMenu(contextMenu)
}
  );

  //init the kiwiPath variable
  const fs = require('fs');
  console.log('fs is defined');
  const os = require('os');
  console.log('os is defined');
  const homePath = os.homedir();
  console.log("home path set to : " + homePath);
  //variable Kiwidir set to the correct path
  if(os.type() == "Linux" || os.type() == "Darwin") {
  var Kiwidir = homePath + '/.kiwilauncher';
  }
  if(os.type() == "Windows_NT") {
  var Kiwidir = homePath + '\\.kiwilauncher';
  }

  // Dans le processus main.



  console.log(Kiwidir);
  win.webContents.session.on('will-download', (event, item, webContents) => {
    // Définit le chemin de sauvegarde, ce qui fait qu'Electron n'affichera pas une boite de dialogue de sauvegarde.
    item.setSavePath(Kiwidir + "/" + item.getFilename());

    item.on('updated', (event, state) => {
      if (state === 'interrupted') {
        console.log('Le téléchargement est interrompu mais peut être redémarrer');

      } else if (state === 'progressing') {
        if (item.isPaused()) {
          console.log('Le téléchargement est en pause')
        } else {
          console.log(`Received bytes: ${item.getReceivedBytes()}`);
        
          
        }
      }
    })
    item.once('done', (event, state) => {
      if (state === 'completed') {
        console.log('Téléchargement réussi')
        global.isDownloadFinished = {prop1: true}
      } else {
        console.log(`Téléchargement échoué : ${state}`)
      }
    })
  })
  // et charger le fichier index.html de l'application.
  win.loadFile('pages/loading.html')

  // Ouvre les DevTools.
  win = null ;
};


// Cette méthode sera appelée quant Electron aura fini
// de s'initialiser et prêt à créer des fenêtres de navigation.
// Certaines APIs peuvent être utilisées uniquement quand cet événement est émit.
app.whenReady().then(createWindow);

// Quitter si toutes les fenêtres ont été fermées.
app.on('window-all-closed', () => {
  // Sur macOS, il est commun pour une application et leur barre de menu
  // de rester active tant que l'utilisateur ne quitte pas explicitement avec Cmd + Q
  // if (process.platform !== 'darwin') {
  //   app.quit()
  // }
})

app.on('activate', () => {
  // Sur macOS, il est commun de re-créer une fenêtre de l'application quand
  // l'icône du dock est cliquée et qu'il n'y a pas d'autres fenêtres d'ouvertes.
  if (win === null) {
    createWindow()
  }
});
