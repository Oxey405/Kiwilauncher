const fs = require('fs');
//console.log('fs is defined');
const os = require('os');
//console.log('os is defined');
const homePath = os.homedir();
//console.log("home path set to : " + homePath);
//resizing window
const { BrowserWindow } = require('electron').remote ;
//variable Kiwidir set to the correct path
if(os.type() == "Linux" || os.type() == "Darwin") {
var Kiwidir = homePath + '/.kiwilauncher';
}
if(os.type() == "Windows_NT") {
var Kiwidir = homePath + '\\.kiwilauncher';
}


if (!fs.existsSync(Kiwidir)){ //here we check if Kiwidir is NOT exist
    fs.mkdirSync(Kiwidir); //if the directory does'nt exist then we create it...
   // console.log('created the app directory');
} else {
  //console.log('app directory already exist... skipped fs.mkdirSync(); action');
}


//setting up confPath

var confPath = Kiwidir + "/config.json" ;
if (!fs.existsSync(confPath)) { //test if confPath NOT exist
fs.writeFile(confPath, '{ "lang":"english" }', (err) => {
  if (err) throw err;
  // console.log('File created !');
});

} else {
  // console.log('app config file already exist... skipped fs.writeFile(); action');
  // console.log('reading config file...');
  fs.readFile(confPath, 'utf8', (err, _config) => {
  if (err) throw err;
  // console.log(_config);
  let config = JSON.parse(_config) ;


fs.writeFile(confPath, '{ "lang":"english" }', (err) => {
  if (err) throw err;
  // console.log('Config file reset to default configuration \r\n Reason : invalid lang proprety');
});
  //loading the config for lang & saving it into the sessionStorage for apply it to every pages
  window.sessionStorage.setItem('lang', config['lang']);
  // console.log(window.sessionStorage.getItem('lang'));
});
}



setInterval(loadComplete, 3000);
function loadComplete() {
  
  BrowserWindow.getFocusedWindow().setSize(1200, 600, true) ;
  BrowserWindow.getFocusedWindow().center();
  window.location.replace('index.html');
}
