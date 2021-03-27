var done = false ;
const BrowserWindow = require('electron').remote ;
if(!done) {
warning();
}
function warning() {
    switch(window.sessionStorage.getItem('lang')) {
        case "english":
            console.log("%c ATTENTION !!", "color:red; font-weight:bold; font-size:50px;text-stroke:yellow;");
            console.log("%c entrer des commandes ici pouraient compromettre ta confidentialité ou ta sécurité !!", "color:orange; font-size:10px;text-stroke:yellow;");
            console.log("%c Si tu sais EXACTEMENT ce que tu fais rien ne t'empêche d'entrer des commandes...\r\nmais n'oublie pas que faire confiance à des inconnus n'est pas une bonne idée...", "color:orange; font-size:10px;text-stroke:yellow;");
            console.log("%c Si tu es VRAIMENT sûr de ce que tu fais peut-être devrais-tu jeter un oeuil à \r\nhttps://github.com/oxey405/KiwiLauncher", "color:orange; font-size:10px;text-stroke:yellow;");
            done = true ;
            break;
    }


}

       
