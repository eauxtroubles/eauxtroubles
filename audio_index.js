document.addEventListener("DOMContentLoaded", function() {
    const audioIcon = document.getElementById('audio-icon');
    const audio = document.querySelector('audio');

    let isFirstClick = true;  // Déterminer si c'est le premier clic
    let isMuted = true;      // Vérifie si le son est désactivé
    sessionStorage.setItem('audioEnabled','false');
    console.log(sessionStorage.getItem('audioEnabled'));

    const savedTime = sessionStorage.getItem('audioTime');
    if (savedTime) {
        audio.currentTime = parseFloat(savedTime);
    }

    audioIcon.addEventListener('click', function() {
        console.log(isFirstClick)
        if (isFirstClick) {
            audio.play();       // Démarre l'audio au premier clic
            sessionStorage.setItem('audioEnabled', 'true');
            console.log(sessionStorage.getItem('audioEnabled'));
            audioIcon.src = "imgs/new_sound.png";
            isFirstClick = false;
            isMuted = false;
        } else {
            if (isMuted) {
                audio.muted = false;  // Réactive le son
                audioIcon.src = "imgs/new_sound.png";
                isMuted = false;
            } else {
                audio.muted = true;   // Coupe le son
                audioIcon.src = "imgs/noSound_new.png";
                isMuted = true;
            }
        }
    });
    

    setInterval(() => {
        if (!audio.paused) {
            sessionStorage.setItem('audioTime', audio.currentTime);
        }
        sessionStorage.setItem('mute',isMuted);
    }, 1000);
});
