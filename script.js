let currentAudio = null;

function toggleAudio(audioId) {
    const audio = document.getElementById(audioId);
    const playButton = document.getElementById('play' + audioId.slice(5));
    const progress = document.getElementById('progress' + audioId.slice(5));
    const timeDisplay = document.getElementById('time' + audioId.slice(5));

    // Останавливаем текущее аудио, если оно есть и не совпадает с выбранным
    if (currentAudio && currentAudio !== audio) {
        currentAudio.pause();
        const currentPlayButton = document.getElementById('play' + currentAudio.id.slice(5));
        currentPlayButton.innerHTML = '<i class="fas fa-play"></i>';
    }

    if (audio.paused) {
        audio.play();
        playButton.innerHTML = '<i class="fas fa-pause"></i>';
        currentAudio = audio; // Обновляем текущее аудио
    } else {
        audio.pause();
        playButton.innerHTML = '<i class="fas fa-play"></i>';
        currentAudio = null; // Если остановлено, сбрасываем текущее аудио
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
