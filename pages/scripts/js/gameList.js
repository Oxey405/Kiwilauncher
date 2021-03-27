var attachTo = document.getElementsByClassName("libraryBox")[0] ;
var x ;
var i;
var parsedGameList ;
//const fs = require('fs');
// const os = require('os');
const homePath = os.homedir();
// console.log("home path set to : " + homePath);
//variable Kiwidir set to the correct path
if(os.type() == "Linux" || os.type() == "Darwin") {
var Kiwidir = homePath + '/.kiwilauncher';
}
if(os.type() == "Windows_NT") {
var Kiwidir = homePath + '\\.kiwilauncher';
}
var gameListFile = Kiwidir + "/gamesLib.json";
// console.log();
function indexLib() {
if(!fs.existsSync(gameListFile)) {
  var defaultGameList = '{"games":[{ "name":"NO GAME AVAIBLE","execFile":"","image":"none.png"} ]}'
  //here we are creating the defaut game list if it wasn't exist !
  fs.writeFile(gameListFile, defaultGameList, (err) => {
    if (err) throw err;
    // console.log('File created !');
  });
} if(fs.existsSync(gameListFile)) {
  fs.readFile(gameListFile, 'utf8', (err, output) => {
    if (err) throw err;
    // console.log(output);
     parsedGameList = JSON.parse(output);
     x = parsedGameList.games ;
    //  console.log(x.length);
     for (i = 0; i < x.length; i++) {
       //creating elements
       document.getElementById("toHide").innerHTML = document.getElementById("toHide").innerHTML + ' <span class="dot" onclick="currentSlide(' + (i+1) + ')"></span> ' ;
       var thisGame = document.createElement("div");
       var titleGame = document.createElement("h3");
       var playGame = document.createElement("button");
       //setting up values of the title
      titleGame.innerHTML = parsedGameList.games[i].name ;
      titleGame.className = "gameTitle";
      titleGame.style.marginTop = "-1px" ;
     playGame.className =  "playButton";
     //setting up values of the play button 
     playGame.innerHTML = "▶" ;
     playGame.setAttribute("onClick", `launch('${parsedGameList.games[i].execFile}');`);
      playGame.style.marginLeft = "105px" ;
      playGame.style.marginTop = "105px" ;
       //setting up values of the div that contains the title node text & the button node
       thisGame.style.background = `url(${Kiwidir}/${parsedGameList.games[i].image})` ;
       thisGame.style.backgroundSize = 'cover' ;
    thisGame.className = "contextMenu fade" ;
    thisGame.style.width = "250px" ;
    thisGame.style.height = "200px";
      thisGame.style.textAlign = "center" ;
      //linking everything together and linking them to the main Div in the page
      
      thisGame.appendChild(titleGame);
      thisGame.appendChild(playGame);
       attachTo.appendChild(thisGame);
     }
  });
}
}
