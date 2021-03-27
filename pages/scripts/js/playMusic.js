const music = new Audio('../ressources/Invest-evan_king.mp3');
music.play();
music.loop = true;
music.volume = 0.0 ;
const myNotification = new Notification('Music : Invest by Evan King', {
body: 'Click here for look at the artist'
})
myNotification.onclick = () => {
  event.preventDefault();
    let link = "https://evankingmusic.com";
    require("electron").shell.openExternal(link);
}
