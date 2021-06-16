let videoContainer = document.querySelector(".videoContainer");
let media = document.querySelector("video");
let play = document.querySelector("#play");
let rwd = document.querySelector("#rwd");
let fwd = document.querySelector("#fwd");
let volume = document.querySelector("#volume");
let expand = document.querySelector("#expand");
let compress = document.querySelector("#compress");
let currentTime = document.querySelector("#currentTime");
let videoTime = document.querySelector("#videoTime");
let progressBar = document.querySelector("#progressInput");
let speedSet = document.querySelector("#speedSet");

expand.addEventListener('click', ()=> {
    if (!document.fullscreenElement) {
        expand.classList.remove("fa-expand");
        expand.classList.add("fa-compress");
        videoContainer.requestFullscreen();
    } else {
        expand.classList.remove("fa-compress");
        expand.classList.add("fa-expand");
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
})
volume.addEventListener('click', () => {
    if (volume.classList.contains("fa-volume-down")) {
        media.volume = 1;
        volume.classList.remove("fa-volume-down");
        volume.classList.add("fa-volume-up");
    }
    else if (volume.classList.contains("fa-volume-up")) {
        media.volume = 0;
        volume.classList.remove("fa-volume-up");
        volume.classList.add("fa-volume-mute");
    }
    else if (volume.classList.contains("fa-volume-mute")) {
        media.volume = .5;
        volume.classList.remove("fa-volume-mute");
        volume.classList.add("fa-volume-down");
    }
})
speedSet.addEventListener('click', () => {
    switch(speedSet.innerText) {
        case '1x': media.playbackRate = 1.5; speedSet.innerText = '1.5x'; break;
        case '1.5x': media.playbackRate = 2; speedSet.innerText = '2x'; break;
        case '2x': media.playbackRate = .5; speedSet.innerText = '0.5x'; break;
        case '0.5x': media.playbackRate= 1; speedSet.innerText= '1x'; break;
    }
})
media.addEventListener('timeupdate', () => {
    let min = (Math.floor(media.currentTime / 60)) < 10 ? '0' + Math.floor(media.currentTime / 60) : Math.floor(media.currentTime / 60);
    let sec = (Math.floor(media.currentTime - (min * 60))) < 10 ? '0' + Math.floor(media.currentTime - (min * 60)) : Math.floor(media.currentTime - (min * 60));
    currentTime.innerText = min + ":" + sec;
    let barLen = (media.currentTime / media.duration) * 100;
    progressBar.style = `background: linear-gradient( 90deg, #5fafff ${barLen}%, #e1e1e1 0%);`
    progressBar.value = barLen;
})
media.addEventListener('ended', () => {
    play.classList.add("fa-play");
    play.classList.remove("fa-pause");
})
progressBar.addEventListener('input', function(){
    media.currentTime = (this.value / 100) * media.duration;
})
function playPauseVideo() {
    let min = (Math.floor(media.duration / 60)) < 10 ? '0' + Math.floor(media.duration / 60) : Math.floor(media.duration / 60);
    let sec = (Math.floor(media.duration - (min * 60))) < 10 ? '0' + Math.floor(media.duration - (min * 60)) : Math.floor(media.duration - (min * 60));
    videoTime.innerText = min + ':' + sec;
    console.log(min , sec);
    play.classList.toggle("fa-play");
    play.classList.toggle("fa-pause");
    if (media.paused) {
        media.play();
    } else {
        media.pause();
    }
}
play.addEventListener('click', playPauseVideo);
rwd.addEventListener('click', () => { media.currentTime-=5; });
fwd.addEventListener('click', () => { media.currentTime+=5; });
document.querySelector("#videoTag").addEventListener('click', playPauseVideo);