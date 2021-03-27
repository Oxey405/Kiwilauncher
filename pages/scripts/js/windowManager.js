var menuOne = document.getElementById("menu");
var library = document.getElementById("library");
var storeOne = document.getElementById("store");
var title = document.getElementById("welcomeText");
var divDot = document.getElementById("toHide");
window.onload = currentSlide(1);
var lang = window.sessionStorage.getItem('lang') ;
if(lang == null) {

}
//litteraly reset the page :P
function resetPage() {
  try {
    document.getElementById("saveButton").remove();
    document.getElementById("shortcuts").remove();
 
  } catch (error) {
    
  }
  document.getElementsByClassName("libraryBox")[0].style.height = "auto" ;
    document.getElementsByClassName("libraryBox")[0].innerHTML = "" ;
    document.getElementById("toHide").innerHTML = "" ;
    library.className = "" ;
    menuOne.className = "" ;
    storeOne.className = "" ;
    divDot.style.display = "none" ;
}


//litteraly create the shortcuts in the main menu :D
function createShortcuts() {
    var shortcuts = document.createElement("div");
    shortcuts.id = "shortcuts" ;

    var libButton = document.createElement("button");
    
    libButton.className = "getButton" ;

    var storeButton = document.createElement("button");
  
    storeButton.className = "getButton" ;
    //translates
    switch (lang) {
      case 'english':
        storeButton.innerHTML = "Game Store";
        libButton.innerHTML = "Game Library" ;
      break;
      case 'french':
        storeButton.innerHTML = "Magasin de jeux";
        libButton.innerHTML = "Ludothèque" ;
      break;
      case 'spanish':
        storeButton.innerHTML = "Tienda de juegos";
        libButton.innerHTML = "Biblioteca de juegos" ;
      break;
      case 'deustch':
        storeButton.innerHTML = "Spieleladen";
        libButton.innerHTML = "Spielbibliothek" ;
      break;
    }

    var shortcutTitle = document.createElement("h1");
    shortcutTitle.innerHTML = "SHORTCUTS" ;

    libButton.setAttribute("onclick", "lib();");
    storeButton.setAttribute("onclick", "store();");

    shortcuts.appendChild(shortcutTitle);
    shortcuts.appendChild(libButton);
    shortcuts.appendChild(storeButton);
    document.getElementsByClassName("mainPageContext")[0].appendChild(shortcuts);
}

//create the menu page
function menu() {
    resetPage();
    createShortcuts();

    //translates
    switch (lang) {
      case 'english':
        title.innerHTML = "Main menu" ;
      break;
      case 'french':
        title.innerHTML = "Menu principal" ;
      break;
      case 'spanish':
        title.innerHTML = "Menú principal" ;
      break;
      case 'deustch':
        title.innerHTML = "Hauptmenü" ;
      break;
    }
    
        menuOne.className = "actual" ;
}
//create the library page
function lib() {
  try {
    document.getElementById("shortcuts").remove();
  } catch (error) {
  }
    resetPage();
    divDot.style.display = "block" ;
    indexLib();

    //translates
    switch (lang) {
      case 'english':
        title.innerHTML = "Game Library" ;
      break;
      case 'french':
        title.innerHTML = "Ludothèque" ;
      break;
      case 'spanish':
        title.innerHTML = "Biblioteca de juegos" ;
      break;
      case 'deustch':
        title.innerHTML = "Spielbibliothek" ;
      break;
    }
   

    library.className = "actual" ;
}
//create the store page
function store() {
  try {
    document.getElementById("shortcuts").remove();
  } catch (error) {
    
  }
  resetPage();
  for(i = 0 ; i < allGameStore.length ; i++) {
    console.log(allGameStore[i]);
    createElementStore(allGameStore[i]);
  }
  divDot.style.display = "block" ;
  

  //translates
  switch (lang) {
    case 'english':
      title.innerHTML = "Game Store" ;
    break;
    case 'french':
      title.innerHTML = "Magasin de jeux" ;
    break;
    case 'spanish':
      title.innerHTML = "Tienda de juegos" ;
    break;
    case 'deustch':
      title.innerHTML = "Spieleladen" ;
    break;
  }
 

  storeOne.className = "actual" ;
}

function settings() {
resetPage();

//translates
switch (lang) {
  case 'english':
    title.innerHTML = "Settings" ;
  break;
  case 'french':
    title.innerHTML = "Paramètres" ;
  break;
  case 'spanish':
    title.innerHTML = "configuraciones" ;
  break;
  case 'deustch':
    title.innerHTML = "die Einstellungen" ;
  break;
}


createSettings();
}



//script for caroussel ; thanks w3schools
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("contextMenu");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].className = "contextMenu invertFade"
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block"; 
  slides[slideIndex-1].className = "contextMenu fade" ; 
  dots[slideIndex-1].className += " active";
}