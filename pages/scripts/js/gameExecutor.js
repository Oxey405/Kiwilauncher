const child = require('child_process');
//const fs = require('fs');
console.log('fs is defined');
//const os = require('os');
console.log('os is defined');
//const homePath = os.homedir();
//var Kiwidir = homePath + '/.kiwilauncher';

function launch(gameFile) {
  var gamePath = Kiwidir+"/"+gameFile ;
  console.log("launching : " + gameFile);
  //provisoirement c'est ici qu'on donne les permissions d'execution
  child.exec('chmod +x ' + gamePath, (error, stdout, stderr) => {
//aucune erreur donnée ici
  });
  //executing application here following the system way
  child.exec(gamePath, (error, stdout, stderr) => {
    if (error) {
      throw error;
    }
    console.log(stdout);
  });
}
