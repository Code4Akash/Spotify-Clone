



// new code



let currentSong = new Audio();
let songs = [];
let currFolder = "";
let currentIndex = 0;

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs(folder) {
  currFolder = folder;
  try {
    let response = await fetch(`${folder}/`);
    let text = await response.text();
    let div = document.createElement("div");
    div.innerHTML = text;
    let as = div.getElementsByTagName("a");
    songs = [];
    for (let index = 0; index < as.length; index++) {
      const element = as[index];
      if (element.href.endsWith(".mp3")) {
        songs.push(element.href.split(`/${folder}/`)[1]);
      }
    }
    // Show all songs in playlist
    let SongUl = document.querySelector(".songsList ul");
    SongUl.innerHTML = "";
    for (const song of songs) {
      SongUl.innerHTML += `<li>
        <img class="invert" src="https://cdn.hugeicons.com/icons/music-note-02-stroke-rounded.svg" alt="music-note-02" width="24" height="24" />
        <div class="info">
          <div>${song.replaceAll(".mp3", "").replaceAll("%20", " ")}</div>
          <div>Akash</div>
        </div>
        <div class="playnow">
          <span>Play Now</span>
          <img class="invert" src="https://cdn.hugeicons.com/icons/play-circle-stroke-rounded.svg" alt="play-circle" width="24" height="24" />
        </div>
      </li>`;
    }

    // Attach event listener to each song
    Array.from(SongUl.getElementsByTagName("li")).forEach((e, index) => {
      e.addEventListener("click", () => {
        PlayMusic(index);
      });
    });
  } catch (error) {
    console.error('Error fetching songs:', error);
  }
}

function PlayMusic(index, pause = false) {
  if (index < 0 || index >= songs.length) return;

  currentIndex = index;
  const track = songs[index];
  currentSong.src = `/${currFolder}/` + track;

  if (!pause) {
    currentSong.play();
    document.getElementById("play").src = "pause.svg";
  }

  document.querySelector(".songinfo").innerHTML = decodeURI(track);
  document.querySelector(".songtime").innerHTML = "00:00/00:00";
}




async function main() {
  // Get list of all songs
  await getSongs("songs/Arijit");
  PlayMusic(0, true);






  // Attach event listener to play button
  let playon = document.getElementById("play");
  playon.addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play();
      playon.src = "pause.svg";
    } else {
      currentSong.pause();
      playon.src = "play.svg";
    }
  });

  // Event listener for song time update
  currentSong.addEventListener("timeupdate", () => {
    document.querySelector(".songtime").innerHTML = `${formatTime(currentSong.currentTime)}/${formatTime(currentSong.duration)}`;
    document.querySelector(".seekbar-thumb").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
  });

  // Adding event listener to seekbar
  document.querySelector(".seekbar-track").addEventListener("click", e => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".seekbar-thumb").style.left = percent + "%";
    currentSong.currentTime = ((currentSong.duration) * percent) / 100;
  });

  // Adding event listener to loop button
  const loop = document.getElementById("loop");
  loop.addEventListener("click", () => {
    loop.src = loop.src.includes("loop.svg") ? "white-loop.svg" : "loop.svg";
  });

  // Adding event listener to shuffle button
  const shuffle = document.getElementById("shuffleon");
  shuffle.addEventListener("click", () => {
    shuffle.src = shuffle.src.includes("shuffle.svg") ? "white-shuffle.svg" : "shuffle.svg";
  });

  // Adding event listener to previous button
  let previousButton = document.querySelector("#previous");
  previousButton.addEventListener("click", () => {
    if (currentIndex > 0) {
      PlayMusic(currentIndex - 1);
    }
  });

  // Adding event listener to next button
  let nextButton = document.querySelector("#next");
  nextButton.addEventListener("click", () => {
    if (currentIndex < songs.length - 1) {
      PlayMusic(currentIndex + 1);
    }
  });



  // Adding event listener to volume control
  document.querySelector(".range input").addEventListener("change", (e) => {
    console.log("Setting volume to", e.target.value);
    currentSong.volume = parseInt(e.target.value) / 100;
  });



 // Adding event listener to volume control img change
document.querySelector(".range input").addEventListener("change", (event) => {
  let volumeBar = document.getElementById("volumerocker");
  let volumeValue = event.target.value; // Get the current value of the range input (0 to 100)
  currentSong.volume = volumeValue / 100; // Set the current song volume (0 to 1)

  if (volumeValue == 0) {
    volumeBar.src = "mute.svg";
  } else if (volumeValue <= 50) {
    volumeBar.src = "volumelow.svg";

  } else {
    volumeBar.src = "volume.svg";
  }
});




  // Load the playlist upon clicking on the card
  Array.from(document.getElementsByClassName("card")).forEach(e => {
    e.addEventListener("click", async item => {
      await getSongs(`songs/${item.currentTarget.dataset.folder}`);
      PlayMusic(0, true);
    });
  });

  // Media Query //

  document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0";
  });
  document.querySelector(".cross").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-120%";
  });



}

main();
