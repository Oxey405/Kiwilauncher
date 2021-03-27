//creating the settings settings
function createSettings() {
  try {
  document.getElementById("saveButton").remove();
  
  }
  catch {
console.log("couldn't find saveButon");
  }
  try {
    document.getElementById("shortcuts").remove();
    
    }
    catch {
  console.log("couldn't fin shortcuts");
    }
 
  var hintLang = document.createElement("p");
  hintLang.innerHTML = "Langage : " ;
  hintLang.style.marginTop = "26px" ;
  var langValue = document.createElement("select");
  langValue.className = "selector" ;
  langValue.id = "selectLang" ;
  langValue.style.marginLeft = "10px" ;
  langValue.style.marginTop = "25px" ;
  langValue.style.width = "150px" ;
  langValue.innerHTML = '<option value="english">English</option> <option value="french">Français</option> <option value="deustch">Deustch</option> <option value="spanish">Español</option>' ;
  var saveButton = document.createElement("button");
  saveButton.innerHTML = "Save changes" ;
  saveButton.className = "saveButton" ;
  saveButton.setAttribute("onclick", "saveChanges();");
  saveButton.id = "saveButton" ;
  document.getElementsByClassName("libraryBox")[0].appendChild(hintLang);
  document.getElementsByClassName("libraryBox")[0].appendChild(langValue);
  document.getElementsByClassName("libraryBox")[0].style.height = "200px" ;
  document.getElementsByClassName("mainPageContext")[0].appendChild(saveButton);
  document.getElementsByClassName("mainPageContext")[0].style.height = "300px" ;
}


/*
const fs = require('fs');
const os = require('os');

const homePath = os.homedir();
//variable Kiwidir set to the correct path
var Kiwidir = homePath + '/.kiwilauncher';
*/
if (!fs.existsSync(Kiwidir)){ //here we check if Kiwidir is NOT exist
    fs.mkdirSync(Kiwidir); //if the directory does'nt exist then we create it...
    console.log('created the app directory');
} else {
  console.log('app directory already exist... skipped fs.mkdirSync(); action');
}

//setting up confPath
var config ;
var confPath = Kiwidir + "/config.json" ;
if (!fs.existsSync(confPath)) { //test if confPath NOT exist
fs.writeFile(confPath, '{ "lang":"english" }', (err) => {
  if (err) throw err;
  console.log('File created !');
});
} else {
  //logs
  console.log('app config file already exist... skipped fs.writeFile(); action');
  console.log('reading config file...');
  //reading config file and putting it into config
  fs.readFile(confPath, 'utf8', (err, _config) => {
  if (err) throw err;
  console.log(_config);
   config = _config ;
   setupConfig(_config);
});
}
//setupConfig is for saveing changes on the config
function setupConfig(_tmpConf) {
  //loading the sessionStorage
  console.log(window.sessionStorage.getItem('lang'));

  var config = _tmpConf ;
  var confParsed = JSON.parse(config);
  console.log(confParsed['lang']);
  if (confParsed['lang'] == 'english') {
  document.getElementById('selectLang').selectedIndex = '0' ;
  console.log('try to modify');
  }
  if (confParsed['lang'] == 'french') {
  document.getElementById('selectLang').selectedIndex = '1' ;
  console.log('try to modify');
  }
  if (confParsed['lang'] == 'deustch') {
  document.getElementById('selectLang').selectedIndex = '2' ;
  console.log('try to modify');
  }
  if (confParsed['lang'] == 'spanish') {
  document.getElementById('selectLang').selectedIndex = '3' ;
  console.log('try to modify');
  }
}
function saveChanges() {
var langIndex = document.getElementById('selectLang').selectedIndex ;
var lang ;
switch (langIndex) {
  case 0:
  lang = "english" ;
     break;
    case 1:
  lang = "french" ;
      break;
      case 2:
  lang = "deustch" ;
        break;
        case 3:
  lang = "spanish" ;
          break;
          default:
          console.error('error language');
          break;
}
var totalJSON = '{ \r\n' + '"lang":' + '"' + lang + '"' + '}' ;
  window.sessionStorage.setItem('lang', JSON.parse(totalJSON)['lang']);
fs.writeFile(confPath, totalJSON, (err) => {
  if (err) throw err;
  console.log('File updated !');
});

const saved = new Notification('KiwiLauncher : parameter changes saved', {
body: 'parameters are now changed and saved !'
})
window.location.replace('index.html');
}


