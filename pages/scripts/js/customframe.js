
  var remote = require('electron').remote;
  var window = remote.getCurrentWindow();
 var { app } = require('electron').remote ;
function exitApp() {

r = confirm('close the window ? (It\'s not the button for stop application)');
if (r == true) {
window.close();
}
}
function stopApp() {

  r = confirm('stop the application completly ?');
  if (r == true) {
  app.quit();
  }
  }
/*const {session} = require('electron').remote ;
session.defaultSession.on("will-download", function(event, downloadItem, webContent) {
downloadItem.on('done', function (event, state) {
    alert("Your download is finished !");
    const myNotification = new Notification('KiwiLauncher : Your download is finished', {
      body: 'The download is completed ! You can now play to your games'
    })
});
});*/