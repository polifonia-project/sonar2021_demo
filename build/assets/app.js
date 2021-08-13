const audioPlayer = new AudioPlayer([
    "/assets/audio/beatles_penny_lane.mp3"
])

function updateSongBarWidth() {
    if (audioPlayer.songIsPlaying()) {
      const songCurrentTime = audioPlayer.getCurrentSongTime()  
      const songDuration = audioPlayer.getCurrentSongDuration()
      console.log("[*] Song current time of: ", songCurrentTime, " - ", songDuration)  
      songBarWidth = (songCurrentTime/songDuration) * 100;
      console.log("[*] Song bar width: ", songBarWidth)
      document.getElementById('songProgress').style.width = `${songBarWidth}px`;
    }
}

// every 0.3 sec update width
let songBarWidth;
setInterval(() => {
    updateSongBarWidth(); 
},300);
