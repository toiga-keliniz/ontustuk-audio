function toggleAudio(audioId) {
    const audio = document.getElementById(audioId);
    const playButton = document.getElementById('play' + audioId.slice(5));
    const progress = document.getElementById('progress' + audioId.slice(5));
    const timeDisplay = document.getElementById('time' + audioId.slice(5));

    if (audio.paused) {
        audio.play();
        playButton.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        audio.pause();
        playButton.innerHTML = '<i class="fas fa-play"></i>';
    }

    audio.addEventListener('timeupdate', function() {
        const minutes = Math.floor(audio.currentTime / 60);
        const seconds = Math.floor(audio.currentTime % 60);
        timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        progress.value = (audio.currentTime / audio.duration) * 100;
    });

    progress.addEventListener('input', function() {
        audio.currentTime = (progress.value / 100) * audio.duration;
    });
}