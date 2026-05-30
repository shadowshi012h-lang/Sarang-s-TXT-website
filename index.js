let songs = [
  "crown.mp3",
  "bluehour.mp3",
  "runaway.mp3",
  "dejavu.mp3"
];

let currentSong = 0;

let player;

let progress = document.getElementById("progress");

window.onload = function () {

  player = document.getElementById("player");

  progress = document.getElementById("progress");

  player.src = songs[currentSong];

  player.addEventListener("ended", nextSong);

  player.addEventListener("timeupdate", updateTime);

  player.addEventListener("loadedmetadata", updateTime);

  player.addEventListener("timeupdate", function () {

      if (!isNaN(player.duration)) {

          progress.max = player.duration;

          progress.value = player.currentTime;

      }

  });

  progress.addEventListener("input", function () {

      player.currentTime = progress.value;

  });

};
function toggleMusic() {

    let button = document.getElementById("playBtn");

    if (player.paused) {

        player.play();

        button.innerHTML = "⏸";

    }

    else {

        player.pause();

        button.innerHTML = "▶";

    }

}

function nextSong() {

  currentSong++;

  if (currentSong >= songs.length) {
    currentSong = 0;
  }

  player.src = songs[currentSong];

  player.play();

}

function previousSong() {

    currentSong--;

    if (currentSong < 0) {

        currentSong = songs.length - 1;

    }

    player.src = songs[currentSong];

    player.play();

}

player.addEventListener("timeupdate", function () {

    if (!isNaN(player.duration)) {

        progress.max = player.duration;

        progress.value = player.currentTime;

    }

});

player.addEventListener("timeupdate", updateTime);

player.addEventListener("loadedmetadata", updateTime);

function updateTime() {

    let currentMinutes = Math.floor(player.currentTime / 60);

    let currentSeconds = Math.floor(player.currentTime % 60);

   let durationMinutes = Math.floor((player.duration || 0) / 60);

let durationSeconds = Math.floor((player.duration || 0) % 60);

    if (currentSeconds < 10) {
        currentSeconds = "0" + currentSeconds;
    }

    if (durationSeconds < 10) {
        durationSeconds = "0" + durationSeconds;
    }

    document.getElementById("time").innerHTML =

    currentMinutes + ":" + currentSeconds +

    " / " +

    durationMinutes + ":" + durationSeconds;

}