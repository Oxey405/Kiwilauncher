//getting the actual selected lang stocked in the 'lang' Item of sessionStorage
var lang = window.sessionStorage.getItem('lang') ;
//add translations for every pages
console.log("lang of the session = " + lang);
if(lang == 'french') {
  if(document.getElementById('welcomeText') != null) {
document.getElementById('welcomeText').innerHTML = "Bienvenue sur KiwiLauncher" ;
  }
  if(document.getElementById('libTitle') != null) {
document.getElementById('libTitle').innerHTML = "Bibliothèque de jeux" ;
  }
  if(document.getElementById('storeTitle') != null) {
document.getElementById('storeTitle').innerHTML = "Magasin en ligne" ;
document.getElementsByClassName('getButton').button.innerHTML = "Télécharger ce jeu" ;
  }
  if(document.getElementById('titleSettings') != null) {
document.getElementById('titleSettings').innerHTML = "paramètres de KiwiLauncher" ;
document.getElementById('saveButton').innerHTML = "Sauvegarder" ;
  }
if (document.getElementById('newsTitlePage') != null) {
    document.getElementById('newsTitlePage').innerHTML = "Nouveautés sur KiwiLauncher" ;
}
}
if(lang == 'english') {
  if(document.getElementById('welcomeText') != null) {
document.getElementById('welcomeText').innerHTML = "Welcome on KiwiLauncher" ;
  }
  if(document.getElementById('libTitle') != null) {
document.getElementById('libTitle').innerHTML = "Game library" ;
  }
  if(document.getElementById('storeTitle') != null) {
document.getElementById('storeTitle').innerHTML = "Online store" ;
document.getElementsByClassName('getButton').button.innerHTML = "Download this game" ;
  }
  if(document.getElementById('titleSettings') != null) {
document.getElementById('titleSettings').innerHTML = "Kiwilauncher's settings" ;
document.getElementById('saveButton').innerHTML = "Save" ;
  }
if (document.getElementById('newsTitlePage') != null) {
    document.getElementById('newsTitlePage').innerHTML = "News on KiwiLauncher" ;
}
}
if(lang != "french" && lang != "english" && lang != "spanish" && lang != "deustch") {
alert("lang settings is broken. Please restart kiwilauncher");
}