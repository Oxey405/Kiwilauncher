console.log("home path set to : " + homePath);
//variable Kiwidir set to the correct path
console.log('Actual Operating Sytem is ' + os.type() + ", the distribution release of this OS is " + os.release() + " and the platform is " + os.platform());
if(os.type() == 'Linux' || os.type() == 'Darwin') {
var Kiwidir = homePath + '/.kiwilauncher';
var libDatabase = Kiwidir + "/gamesLib.json" ;
}
if(os.type() == 'Windows_NT') {
var Kiwidir = homePath + '\\.kiwilauncher';
var libDatabase = Kiwidir + "\\gamesLib.json" ;
}
var gameList ;
console.log(libDatabase);
if (!fs.existsSync(libDatabase)){ //here we check if Kiwidir is NOT exist
  if(os.type() == 'Linux') {
    fs.writeFile(libDatabase, '{"games":[{ \r\n "name":"colorsup",\r\n"execFile":"colorsup.AppImage",\r\n"image":"colorsup-logo.png"\r\n} \r\n ]}', (err) => {
      if (err) throw err;
      console.log('File created !');
    }); //if the file does'nt exist then we create it...
  }
  if(os.type() == 'Windows_NT') {
    fs.writeFile(libDatabase, '{"games":[{ \r\n "name":"colorsup",\r\n"execFile":"colorsup.exe",\r\n"image":"colorsup-logo.png"\r\n} \r\n ]}', (err) => {
      if (err) throw err;
      console.log('File created !');
    }); //if the file does'nt exist then we create it...
  }
    console.log('created the library game database');
} else {
  console.log('library game database already exist... writeFile() skipped for reading file');
}
fs.readFile(libDatabase, 'utf8', (err, _gameList) =>{
  if (err) throw err;
  gameList = JSON.parse(_gameList);
  console.log(gameList);
  createElementGameLib(_gameList);
});
function length(obj) {
    return Object.keys(obj).length;
}
function createElementGameLib(_gameList) {
gameList = JSON.parse(_gameList);
  var nbGames = length (gameList.games);
  console.log(nbGames);
  for (var i = 0; i < nbGames; i++) {
    var divGame = document.createElement('div');
    divGame.className = "contextMenu" ;
    var imageURL = Kiwidir+"/"+gameList['games'][i]['image'] ;
    divGame.style.background = 'url('+imageURL+')' ;
    divGame.backgroundSize = 'cover' ;
    divGame.style.backgroundPosition = 'center' ;
    var gameTextName = document.createElement('p');
    gameTextName.innerHTML = gameList['games'][i]['name'] ;
    gameTextName.className = "gameTitle" ;
    var playButton = document.createElement('button');
    playButton.className = "playButton" ;
    playButton.innerHTML = "▶" ;
    var execPath = gameList['games'][i]['execFile'] ;
    playButton.setAttribute('onclick', 'launch('+"'"+execPath+"'"+');') ;
    console.log(playButton.onclick);
    divGame.appendChild(playButton);
    divGame.appendChild(gameTextName);
    document.getElementById('gameList').appendChild(divGame);
  }

}
