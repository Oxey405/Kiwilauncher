const fs = require("fs");
const os = require("os");
var allGameStore = [] ;
const http = require("http");
const { kill } = require("process");
//sending request to the API
var key = "TestPassWD!";
var rqstURL = `http://localhost/oxey405/API/Kiwilauncher/makeRequest.php?token=${key}&request=GameList` ;
var gameList = "" ;
var rqst = new XMLHttpRequest();
rqst.open('GET', rqstURL);
rqst.responseType = "text" ;
rqst.send();
//throw network errors
rqst.onerror = function() {
    alert("unexpected error while downloading store");
}
//doing things when respsonse is got
rqst.onload = function() {
    var responseText = rqst.response ;
    //here we throw errors
    if(responseText == "wrong_token") {
        console.log("wrong token, please try again");
    }
    else if(responseText == "bad_request") {
        console.log("Bad request, please try again");
    } else {
        //here we try to make the store
        gameList = JSON.parse(responseText);
        for(i = 0 ; i < gameList["Games"].length ; i++){

            console.log("Got response from API : "  + gameList["Games"][i][0]);
            getGame(gameList["Games"][i][0]);
            
        }
    }
}
var outputtxt ;
var outputJSON ;
function getGame(gameName) {
    console.log("Trying to get properties of " + gameName);
    var key = "TestPassWD!";
var rqstURL = `http://localhost/oxey405/API/Kiwilauncher/makeRequest.php?token=${key}&request=Game&args=${gameName}` ;
var gameJSON = "" ;
var rqst = new XMLHttpRequest();
rqst.open('GET', rqstURL);
rqst.responseType = "text" ;
rqst.send();
rqst.onload = function() {
     outputtxt = rqst.responseText;
     outputJSON = JSON.parse(outputtxt);
     allGameStore.push(outputJSON);
     console.log(allGameStore);
}
return outputJSON;
}


function createElementStore(game) {
    //creating the store page
        var divGame = document.createElement('div');
        divGame.className = "contextMenu" ;
        console.log("trying to get" + JSON.stringify(game));
        var imageURL = "http://localhost/oxey405/API/Kiwilauncher/Public/"+game['image'] ;
        divGame.style.background = 'url('+imageURL+')' ;
        divGame.backgroundSize = 'cover' ;
        divGame.style.backgroundPosition = 'center' ;
        var gameTextName = document.createElement('p');
        gameTextName.innerHTML = game['name'] ;
        gameTextName.className = "gameTitle" ;
        var playButton = document.createElement('button');
        playButton.className = "getButton" ;
        playButton.innerHTML = "Download" ;
        var dwnldURL = document.createElement('a');
        if(os.platform() == "linux") {  
        var execPath = game['execFile'] ;
        dwnldURL.setAttribute('href', `http://localhost/oxey405/API/Kiwilauncher/DownloadZone/${execPath}`) ;
        dwnldURL.setAttribute('download', '');
        playButton.setAttribute('onclick', `addGame('${JSON.stringify(game)}')`);
        }
        dwnldURL.appendChild(playButton);
        divGame.appendChild(gameTextName);
        divGame.appendChild(dwnldURL);
        divGame.style.height = '200px';
        divGame.style.width = '250px';
        document.getElementsByClassName('libraryBox')[0].appendChild(divGame);
      
    }
    function addGame(gameToAdd) {
        console.log("adding " + JSON.stringify(gameToAdd));
        gameToAdd = JSON.parse(gameToAdd);
        var homePath = os.homedir();
        //getting the type of OS and setting up the Kiwilauncher directory
        if(os.type() == 'Linux' || os.type() == 'Darwin') {
            var Kiwidir = homePath + '/.kiwilauncher';
            var libDatabase = Kiwidir + "/gamesLib.json" ;
            }
            if(os.type() == 'Windows_NT') {
            var Kiwidir = homePath + '\\.kiwilauncher';
            var libDatabase = Kiwidir + "\\gamesLib.json" ;
            }
        console.log(libDatabase);
        //getting images
        var imageDlURL = Kiwidir + "/" + gameToAdd["name"].toLowerCase() + ".png" ;
        var dlCover  = fs.createWriteStream(imageDlURL);
        var dlURL = "http://localhost/oxey405/API/Kiwilauncher/Public/"+gameToAdd["name"].toLowerCase()+".png" ;
        console.log(dlURL);
        var rqstDlImage = http.get(dlURL, function(response) { response.pipe(dlCover) });
        //starting to register the game into a JSON
        modifyDatabase(gameToAdd, libDatabase);
        
    }
    function modifyDatabase(gameToAdd, libDatabase) {
        var actualGameList ;
        fs.readFile(libDatabase, 'utf8', (err, _gameList) =>{
            if (err) throw err;
            actualGameList = JSON.parse(_gameList);
             //setting up new settings
            var gameListslice = JSON.stringify(actualGameList["games"]).replaceAll("[", "");
            var gameListslice = JSON.stringify(actualGameList["games"]).replaceAll("]", "");
            var newGameListTxt = '{ "games":'+ gameListslice + "," +JSON.stringify(gameToAdd) + "]}";
            rewrite(libDatabase, newGameListTxt);
          });
    }
    function rewrite(libDatabase, newGameListTxt) {
        //rewriting the file
        fs.writeFile(libDatabase, newGameListTxt, err => {
            console.log("error while rewriting : " + err);
        });
        console.log("done");
    }