const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music within an array to populate the playlist for the music, db for later when it is a music player for everyone hide api key!!!
const songs = [ 
    {
        name: 'allthat',
        displayName: 'All That',
        artist: 'by bensound.com',
    },
    {
        name: 'creative',
        displayName: 'Creative',
        artist: 'by bensound.com',
    },
    {
        name: 'energy',
        displayName: 'Energy',
        artist: 'by bensound.com',
    },
    {
        name: 'goinghigher',
        displayName: 'Going Higher',
        artist: 'by bensound.com',
    },
    {
        name: 'memories',
        displayName: 'Memories',
        artist: 'by bensound.com',
    },
    {
        name: 'onceagain',
        displayName: 'Once Again',
        artist: 'by bensound.com',
    },
];

// Check if song is Playing
let isPlaying = false;

// Play function
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause'); // replaces play icon with pause icon
    playBtn.setAttribute('title', 'Pause'); // changes button title from play to pause when music is playing
    music.play(); 
}

// Pause function
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play'); // replaces pause icon with play icon
    playBtn.setAttribute('title', 'Play'); // changes button title from pause to play when music is paused
    music.pause(); 
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update Dom with next song
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `royalty free music/${song.name}.mp3`;
    image.src = `royalty free img/${song.name}.jpg`;
  }
// Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Next Song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length -1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// function On Load Select first Song
loadSong(songs[songIndex]);

// Update Progress Bar and Time
function updateProgressBar(e) {
    if(isPlaying) {
        const { duration, currentTime} = e.srcElement;
        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`; //width percentage of progress bar, styled in css
        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`
        }
        // Delay switching duration El displaying Nan
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        const currentMinutes = Math.floor(currentTime/ 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// Set Progress Bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration} = music;
    music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);