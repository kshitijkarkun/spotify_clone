/// <reference lib="dom" />
//initalize the vars
let songIndex =0;
let audioElement = new Audio('ncs/Prong, BOTCASH, Justin OH - Ghost Of Me [NCS Release].mp3');
let play=document.getElementById("play");
let progressbar=document.getElementById("progressbar");

let songs=[
    {songName:"Prong, BOTCASH, Justin OH - Ghost Of Me [NCS Release]", filePath:"ncs/1.mp3", coverPath:"ghost of me.jpeg"},
    {songName:"LULO, kaya! - Hit The Ground [NCS Release]", filePath:"ncs/2.mp3", coverPath:"hit the ground.jpeg"},
    {songName:"X972, sk3tch01, MXZI - Montagem Toma [NCS Release]", filePath:"ncs/3.mp3", coverPath:"montagem.jpeg"},
    {songName:"Warriyo, LXNGVX - Mortals Funk Remix [NCS Release]", filePath:"ncs/4.mp3", coverPath:"mortals funk.jpeg"},
    {songName:"LXNGVX - Royalty Funk [NCS Release]", filePath:"ncs/5.mp3", coverPath:"royalty funk.jpeg"},
    {songName:"ksma", filePath:"ncs/6.mp3", coverPath:"al1.jpeg"},
    {songName:"ksma", filePath:"ncs/7.mp3", coverPath:"al1.jpeg"},
    {songName:"ksma", filePath:"ncs/8.mp3", coverPath:"al1.jpeg"},
    {songName:"ksma", filePath:"ncs/9.mp3", coverPath:"al1.jpeg"},
    {songName:"ksma", filePath:"ncs/10.mp3", coverPath:"al1.jpeg"},
]
//play pause 
play.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        play.classList.remove('fa-circle-play');
        play.classList.add('fa-circle-pause');
    }
    else{
        audioElement.pause();
        play.classList.remove('fa-circle-pause');
        play.classList.add('fa-circle-play');
        
    }

})
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
Array.from(document.getElementsByClassName('songCard')).forEach((Element) => {
    Element.addEventListener('click', (e)=>{
        makeplay();
        console.log(e.currentTarget);
        songIndex=parseInt(e.currentTarget.id);
        audioElement.src=`ncs/${songIndex}.mp3`;
        audioElement.currentTime=0;
        audioElement.play();
        play.classList.remove('fa-circle-play');
        play.classList.add('fa-circle-pause');
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
})