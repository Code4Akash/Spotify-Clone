// let currentSong = new Audio();
// let songs = [];
// let currFolder = "";
// let currentIndex = 0;

// function formatTime(seconds) {
//   const minutes = Math.floor(seconds / 60);
//   const remainingSeconds = Math.floor(seconds % 60);

//   const formattedMinutes = String(minutes).padStart(2, '0');
//   const formattedSeconds = String(remainingSeconds).padStart(2, '0');

//   return `${formattedMinutes}:${formattedSeconds}`;
// }

// async function getsongs(folder) {
//   currFolder = folder;
//   let a = await fetch(`http://127.0.0.1:5500/${folder}/`);
//   let response = await a.text();
//   let div = document.createElement("div");
//   div.innerHTML = response;
//   let as = div.getElementsByTagName("a");
//   songs = [];
//   for (let index = 0; index < as.length; index++) {
//     const element = as[index];
//     if (element.href.endsWith(".mp3")) {
//       songs.push(element.href.split(`/${folder}/`)[1]);
//     }
//   }
//   // Show all songs in playlist//
//   let SongUl = document.querySelector(".songsList").getElementsByTagName("ul")[0];
//   SongUl.innerHTML = ""
//   for (const song of songs) {
//     SongUl.innerHTML += `<li><img class="invert" src="https://cdn.hugeicons.com/icons/music-note-02-stroke-rounded.svg" alt="music-note-02" width="24" height="24" />
//          <div class="info">
//            <div>${(song.replaceAll(".mp3", "").replaceAll("%20", " "))}</div>
//            <div>Akash</div>
//          </div>
//          <div class="playnow">
//            <span>Play Now</span>
//            <img class="invert" src="https://cdn.hugeicons.com/icons/play-circle-stroke-rounded.svg" alt="play-circle" width="24" height="24" />
//          </div>
//        </li>`;
//   }

//   // Attach an event listener to each song
//   Array.from(SongUl.getElementsByTagName("li")).forEach((e) => {
//     // e.addEventListener("Domcontentloaded", () => {

//     // })
//     e.addEventListener("click", () => {
//       console.log(e.querySelector(".info").firstElementChild.innerHTML);
//       PlayMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
//     });
//   });
// }

// const PlayMusic = (track, pause = false) => {

//   currentSong.src = `/${currFolder}/` + track + ".mp3"

//   if (!pause) {
//     currentSong.play();
//     play.src = "pause.svg"
//   }

//   document.querySelector(".songinfo").innerHTML = decodeURI(track)
//   document.querySelector(".songtime").innerHTML = "00.00/00.00"

// };


// // Function to trim .mp3 extension from the URL
// function trimMp3Extension(url) {
//   // Check if the URL ends with ".mp3"
//   if (url.endsWith(".mp3")) {
//     // Use substring to remove the last 4 characters (which is the length of ".mp3")
//     return url.substring(0, url.length - 4);
//   } else {
//     // URL doesn't end with ".mp3", return the original URL
//     return url;
//   }
// }

// async function DisplayAlbums() {
//   let a = await fetch(`http://127.0.0.1:5500/${folder}/`);
//   let response = await a.text();
//   let div = document.createElement("div");
//   div.innerHTML = response;
//   let anchors = document.getElementsByTagName("a");
//   Array.from(anchors)
//   for (let index = 0; index < array.length; index++) {
//     const e = array[index];

//     if (e.href.includes("/songs")) {
//       let folder = e.href.split("/").slice(-2)[0];

//       // Get the meta data of the folder
//       let a = await fetch(`http://127.0.0.1:5500/${folder}/info.json`);
//       let response = await a.json();
//       console.log(response);

//       // Update card containers' innerHTML correctly
//       let cardContainers = document.querySelector(".card-containers"); // Ensure you have an element with this class
//       cardContainers.innerHTML = cardContainers.innerHTML + `
//         <div class="card" data-folder="${folder}">
//           <img src="/songs/${folder}/cover.jpg" alt="Call Aundi" class="card-img" />
//           <button aria-label="Play" class="play-button">
//             <svg viewBox="0 0 24 24" class="play-icon">
//               <path d="M7.05 3.606L20.54 11.394a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
//             </svg>
//           </button>
//           <h2>${response.title}</h2>
//           <p>${response.description}</p>
//         </div>`;
//     }
//   };
// }



// async function main() {
//   // Get list of all songs//
//   await getsongs("songs/Arijit");
//   PlayMusic(trimMp3Extension(songs[0]), true)


//   //Display all the albums in the page//




//   //Attach an event listener to play//

//   let playon = document.getElementById("play")
//   playon.addEventListener("click", () => {
//     if (currentSong.paused) {
//       currentSong.play()
//       playon.src = "pause.svg";
//     } else {
//       currentSong.pause();
//       playon.src = "play.svg";
//     }
//   });

//   //Event listener for song time update
//   currentSong.addEventListener("timeupdate", () => {
//     document.querySelector(".songtime").innerHTML = `${formatTime(currentSong.currentTime)}/${formatTime(currentSong.duration)}`
//     document.querySelector(".seekbar-thumb").style.left = (currentSong.currentTime / currentSong.duration)
//       * 100 + "%";
//   })

//   // Adding event listener to seekbar 
//   document.querySelector(".seekbar-track").addEventListener("click", e => {
//     console.log(e.offsetX);
//     let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100
//     document.querySelector(".seekbar-thumb").style.left = percent + "%"
//     currentSong.currentTime = ((currentSong.duration) * percent) / 100
//   })

//   // Adding event listener to loop button
//   const loop = document.getElementById("loop");

//   loop.addEventListener("click", () => {
//     // Check if the src contains "loop.svg" and toggle it
//     if (loop.src.includes("loop.svg") && !loop.src.includes("white-loop.svg")) {
//       loop.src = "white-loop.svg";
//     } else {
//       loop.src = "loop.svg";
//     }
//   });


//   // Adding an event listener to shuffle //
//   const shuffle = document.getElementById("shuffleon");

//   shuffle.addEventListener("click", () => {
//     // Check if the src contains "loop.svg" and toggle it
//     if (shuffle.src.includes("shuffle.svg") && !shuffle.src.includes("white-shuffle.svg")) {
//       shuffle.src = "white-shuffle.svg";
//     } else {
//       shuffle.src = "shuffle.svg";
//     }
//   });


//   // let previousButton = document.querySelector("#previous");
//   // previousButton.addEventListener("click", () => {
//   //   currentIndex--;
//   //   if (currentIndex > 0) {
//   //     playMusic(songs[currentIndex]);
//   //   } else {
//   //   }
//   // });


//   // let previousButton = document.querySelector("#previous");
//   // previousButton.addEventListener("click", () => {
//   //   currentIndex--;
//   //   if (currentIndex > 0) {
//   //     playMusic(songs[0]);
//   //   } else {
//   //   }
//   // });


//   // Adding event listener to previous button
//   let previousButton = document.querySelector("#previous");
//   previousButton.addEventListener("click", () => {
//     if (currentIndex > 0) {
//       PlayMusic(currentIndex - 1);
//     }
//   });

//   // Adding event listener to next button
//   let nextButton = document.querySelector("#next");
//   nextButton.addEventListener("click", () => {
//     if (currentIndex < songs.length - 1) {
//       PlayMusic(currentIndex + 1);
//     }
//   });
//   // //Adding event listener to next//
//   // document.getElementById("next").addEventListener("click", () => {
//   //   let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
//   //   console.log(index);
//   //   if ((index + 1) < songs.length) {
//   //     PlayMusic(trimMp3Extension(songs[index + 1]));
//   //   }
//   // });



//   //Add an event listener to volume //
//   document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {

//     currentSong.volume = parseInt(e.target.value) / 100

//   })

//   // Load the playlist upon clicking on the card//
//   Array.from(document.getElementsByClassName("card")).forEach(e => {
//     e.addEventListener("click", async item => {
//       console.log(item.currentTarget.dataset.folder);
//       songs = await getsongs(`songs/${item.currentTarget.dataset.folder}`);
//     });
//   });

//   document.querySelector(".hamburger").addEventListener("click", () => {
//     document.querySelector(".left").style.left = "0"
//   })
//   document.querySelector(".cross").addEventListener("click", () => {
//     document.querySelector(".left").style.left = "-120%"
//   })

// }

// main();



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
    let response = await fetch(`http://127.0.0.1:5500/${folder}/`);
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

async function DisplayAlbums() {
  try {
    let a = await fetch(`http://127.0.0.1:5500/songs/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;

    let anchors = document.getElementsByTagName("a");
    Array.from(anchors).forEach(async (e) => {
      if (e.href.includes("/songs")) {
        let folder = e.href.split("/").slice(-2)[0];

        try {
          // Get the meta data of the folder
          let meta = await fetch(`http://127.0.0.1:5500/${folder}/info.json`);
          let metaResponse = await meta.json();
          console.log(metaResponse);

          // Update card containers' innerHTML correctly
          let cardContainers = document.querySelector(".card-containers"); // Ensure you have an element with this class
          if (cardContainers) {
            cardContainers.innerHTML += `
              <div class="card" data-folder="${folder}">
                <img src="/songs/${folder}/cover.jpg" alt="${metaResponse.title}" class="card-img" />
                <button aria-label="Play" class="play-button">
                  <svg viewBox="0 0 24 24" class="play-icon">
                    <path d="M7.05 3.606L20.54 11.394a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
                  </svg>
                </button>
                <h2>${metaResponse.title}</h2>
                <p>${metaResponse.description}</p>
              </div>`;
          } else {
            console.error("Card container element not found.");
          }
        } catch (error) {
          console.error(`Failed to fetch metadata for folder: ${folder}`, error);
        }
      }
    });
  } catch (error) {
    console.error("Failed to fetch the list of songs.", error);
  }
}

// Call the function to display the albums
DisplayAlbums();


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
