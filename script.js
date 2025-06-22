/// <reference lib="dom" />
//initalize the vars
let songIndex =0;
let audioElement = new Audio('ncs/Prong, BOTCASH, Justin OH - Ghost Of Me [NCS Release].mp3');
let play=document.getElementById("play");
let currentSongDisplay=document.querySelector('.currentSongImg');
let progressbar=document.getElementById("progressbar");
let artSection = document.querySelector('.art');

let songs=[
    {songName:"Prong, BOTCASH, Justin OH - Ghost Of Me [NCS Release]", filePath:"ncs/1.mp3", coverPath:"1.jpg"},
    {songName:"LULO, kaya! - Hit The Ground [NCS Release]", filePath:"ncs/2.mp3", coverPath:"2.jpg"},
    {songName:"X972, sk3tch01, MXZI - Montagem Toma [NCS Release]", filePath:"ncs/3.mp3", coverPath:"3.jpg"},
    {songName:"Warriyo, LXNGVX - Mortals Funk Remix [NCS Release]", filePath:"ncs/4.mp3", coverPath:"4.jpg"},
    {songName:"LXNGVX - Royalty Funk [NCS Release]", filePath:"ncs/5.mp3", coverPath:"5.jpg"}
]
//play pause 
play.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        play.classList.remove('fa-circle-play');
        play.classList.add('fa-circle-pause');
        artSection.classList.add('playing');
    } else {
        audioElement.pause();
        play.classList.remove('fa-circle-pause');
        play.classList.add('fa-circle-play');
        artSection.classList.remove('playing');
    }
});

//listen to events
audioElement.addEventListener('timeupdate', ()=>{
    //update seekbar
    let progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    progressbar.value=progress;
})

progressbar.addEventListener('change',()=>{
    audioElement.currentTime=progressbar.value*audioElement.duration/100;
})
const makeplay =()=>{
    play.classList.remove('fa-circle-play');
    play.classList.add('fa-circle-pause');
}
function updateCurrentlyPlaying(index) {
    currentSongDisplay.innerHTML = `
        <img src="img/${songs[index-1].coverPath}" alt="${songs[index].songName}" width="150" height="150" style="border-radius:10px;">
        <h3 style="margin-top: 10px; text-align: center;">${songs[index].songName}</h3>
        <p>Now Playing</p>
    `;
}

Array.from(document.getElementsByClassName('songCard')).forEach((Element) => {
    Element.addEventListener('click', (e)=>{
        makeplay();
        console.log(e.currentTarget);
        songIndex=parseInt(e.currentTarget.id);
        audioElement.src=`ncs/${songIndex}.mp3`;
        audioElement.currentTime=0;
        audioElement.play();
        artSection.classList.add('playing');
        play.classList.remove('fa-circle-play');
        play.classList.add('fa-circle-pause');
        updateCurrentlyPlaying(songIndex);
    })
});
document.getElementById('forward').addEventListener('click',()=>{
    if(songIndex>4){
        songIndex=1;
    }
    else{
        songIndex+=1;
    }
    audioElement.src=`ncs/${songIndex}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    play.classList.remove('fa-circle-play');
    play.classList.add('fa-circle-pause');
    updateCurrentlyPlaying(songIndex);

})
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<2){
        songIndex=5;
    }
    else{
        songIndex-=1;
    }
    audioElement.src=`ncs/${songIndex}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    play.classList.remove('fa-circle-play');
    play.classList.add('fa-circle-pause');
    updateCurrentlyPlaying(songIndex);
})
//search button with api 
document.getElementById("searchBtn").addEventListener("click", () => {
    let query = document.getElementById("searchInput").value.trim();
    if (!query) return;

    let apiURL = `https://api.codetabs.com/v1/proxy/?quest=https://api.deezer.com/search?q=${query}`;

    fetch(apiURL)
        .then(res => res.json())
        .then(data => {
            const trendingSection = document.querySelector(".trending"); // hide trending
            const searchResults = document.getElementById("searchResults");
            const searchHeading = document.getElementById("searchHeading");

            if (!searchResults || !searchHeading || !trendingSection) {
                console.error("Required DOM elements not found");
                return;
            }

            searchResults.innerHTML = "";
            searchHeading.style.display = "block";
            trendingSection.style.display = "none";

            if (!data.data || data.data.length === 0) {
                searchResults.innerHTML = "<p>No results found.</p>";
                return;
            }

            // ✅ Show search results & enable playback using your function
            displaySearchResults(data.data.slice(0, 10));
        })
        .catch(err => {
            console.error("API fetch failed", err);
        });
});

//playing from search logic
const previewPlayer = document.getElementById("previewPlayer");

function displaySearchResults(tracks) {
    const resultsDiv = document.getElementById("searchResults");
    resultsDiv.innerHTML = ""; // clear previous results
    document.getElementById("searchHeading").style.display = "block";

    tracks.forEach((track) => {
        const card = document.createElement("div");
        card.className = "songCard";

        const img = document.createElement("img");
        img.src = track.album.cover_medium;

        const info = document.createElement("div");
        info.className = "songInfo";
        info.innerHTML = `<p>${track.title}</p><p>${track.artist.name}</p>`;

        card.appendChild(img);
        card.appendChild(info);
        resultsDiv.appendChild(card);

        // 🎵 Add click to play preview
        card.addEventListener("click", () => {
            if (track.preview) {
                // Stop local file playback if running
                audioElement.pause();
                artSection.classList.add('playing');

        
                // Use main audio element instead of previewPlayer
                audioElement.src = track.preview;
                audioElement.currentTime = 0;
                audioElement.play();
        
                // 🔁 Change bottom play icon to pause
                play.classList.remove('fa-circle-play');
                play.classList.add('fa-circle-pause');
        
                // 🎨 Update Currently Playing section
                currentSongDisplay.innerHTML = `
                    <img src="${track.album.cover_medium}" alt="${track.title}" width="150" height="150" style="border-radius:10px;">
                    <h3 style="margin-top: 10px; text-align: center;">${track.title}</h3>
                    <p style="text-align: center;">${track.artist.name}</p>
                `;
            } else {
                alert("No preview available for this song.");
            }
        });
           
    });
}
previewPlayer.addEventListener("timeupdate", () => {
    const progress = parseInt((previewPlayer.currentTime / previewPlayer.duration) * 100);
    progressbar.value = progress;
});
progressbar.addEventListener("input", () => {
    if (!previewPlayer.paused) {
        previewPlayer.currentTime = (progressbar.value * previewPlayer.duration) / 100;
    }
});
