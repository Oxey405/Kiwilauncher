const { session } = require('electron').remote ;
document.getElementById("dwnld").innerHTML = "No downloads";
// console.log("DownloadManager is now working !");
if(!navigator.onLine) {
alert("Vous êtes hors connexion");
}

//start managing downloads when download STARTED
session.defaultSession.on("will-download", function(event, downloadItem, webContent) {
downloadItem.on('done', function (event, state) {

    const downloadFinished = new Notification('KiwiLauncher : Your download is finished', {
        body: 'The download is completed ! You can now play to your game'
      })
    
    document.getElementById('dwnld').innerHTML = `Download finished`;
}
);

downloadItem.on('updated', function (event, state) {
if(state === 'progressing') {
    let percentage = downloadItem.getReceivedBytes()/downloadItem.getTotalBytes();
                        percent =  percentage * 100;
                        percent = parseFloat( percent.toFixed(2) );
document.getElementById('dwnld').innerHTML = `Downloading items (${percent}%)`;
document.getElementById('progressBar').style.width = percent + "%" ;
// console.log(downloadItem);
}
if(state === "interrupted") {
    const DwnldCantGet = new Notification('KiwiLauncher : Download informations', {
        body: 'kiwilauncher is unable to get files from the server... check your connexion'
      })
}
});


});
