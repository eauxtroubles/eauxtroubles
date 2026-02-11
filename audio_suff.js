const audioIcon = document.getElementById('audio-icon');
const audio = document.querySelector('audio');

let isFirstClick = true;  // Déterminer si c'est le premier clic
let isMuted = sessionStorage.getItem('mute');
console.log("muted from item : ", isMuted)


document.addEventListener("DOMContentLoaded", function() {
    const savedTime = sessionStorage.getItem('audioTime');
    if (savedTime) {
        audio.currentTime = parseFloat(savedTime);
    }

    const isAudioEnabled = sessionStorage.getItem('audioEnabled');
    if(isAudioEnabled != "true" && sessionStorage.getItem('audioAlert')!="true"){
        alert("Si tu le souhaites tu peux activer l'audio grâce à l'icône en haut à gauche");
        sessionStorage.setItem('audioAlert','true');
    } else {
        if(isMuted== "false"){
            audio.play();   // Réactive le son
            audio.muted = false;  
            audioIcon.src = "imgs/new_sound.webp";
            console.log("muted, start condition : ",isMuted);
        }
    }

    if(sessionStorage.getItem('autoplayAlert')!="true")
    {
        alert("Pour que la lecture audio soit active dès l'ouverture des pages suivantes, veuillez autoriser (si besoin) la lecture automatique de médias.");
        sessionStorage.setItem('autoplayAlert','true')
    }

    audioIcon.addEventListener('click', function() {
        if (isFirstClick) {
            if(isMuted == "true")
            {
                audio.play();       // Démarre l'audio au premier clic
                audioIcon.src = "imgs/new_sound.webp";
                sessionStorage.setItem('audioEnabled', 'true');
                isMuted = "false";
            }
            else{
                audio.muted = true
                audioIcon.src = "imgs/noSound_new.webp";
                isMuted = "true";
            }
            isFirstClick = false;
            console.log("muted end first click ",isMuted)
            //alert("Pour que la lecture audio soit active dès l'ouverture des pages suivantes, veuillez autoriser (si besoin) la lecture automatique de médias.");
        } else {
            if (isMuted=="true") {
                audio.muted = false;  // Réactive le son
                audioIcon.src = "imgs/new_sound.webp";
                isMuted = "false";
                console.log("active son ", isMuted)
            } 
            else {
                audio.muted = true;   // Coupe le son
                audioIcon.src = "imgs/noSound_new.webp";
                isMuted = "true";
                console.log("coupe son ",isMuted)
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
