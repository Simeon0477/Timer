// Récupération du temps 
let days_input = document.querySelector("#days");
let hours_input = document.querySelector("#hours");
let minutes_input = document.querySelector("#minutes");
let seconds_input = document.querySelector("#seconds");
let chrono = document.querySelector("#chrono");
let start = document.querySelector("#start");
let reset = document.querySelector("#reset");

// Empêcher l'insertion de valeur négatives ou de valeurs hors intervalles
days_input.addEventListener("input", function() {
    if (this.value < 0) this.value = 0;
});
hours_input.addEventListener("input", function() {
    if (this.value < 0 || this.value > 23) this.value = 0;
});
minutes_input.addEventListener("input", function() {
    if (this.value < 0 || this.value > 59) this.value = 0;
});
seconds_input.addEventListener("input", function() {
    if (this.value < 0 || this.value > 59) this.value = 0;
});

let timer;
let is_running = false;
let total_seconds = 0;

// Affichage
function Chrono() {
    let days = Math.floor(total_seconds / (24 * 3600));
    let hours = Math.floor((total_seconds % (24 * 3600)) / 3600);
    let minutes = Math.floor((total_seconds % 3600) / 60);
    let seconds = total_seconds % 60;

    let daysOutput = (days < 10) ? "0" + days : days;
    let hoursOutput = (hours < 10) ? "0" + hours : hours;
    let minutesOutput = (minutes < 10) ? "0" + minutes : minutes;
    let secondsOutput = (seconds < 10) ? "0" + seconds : seconds;
    
    // Mise à jour de l'afficharge
    chrono.innerHTML = "<span>" + daysOutput + ":" + hoursOutput + ":" + minutesOutput + ":" + secondsOutput + "</span>";
}

function start_timer() {
    if (!is_running) {
        if (total_seconds === 0) {
            let days = parseInt(days_input.value) || 0;
            let hours = parseInt(hours_input.value) || 0;
            let minutes = parseInt(minutes_input.value) || 0;
            let seconds = parseInt(seconds_input.value) || 0;
            
            total_seconds = (days * 24 * 3600) + (hours * 3600) + (minutes * 60 + seconds);
        }
        
        if (total_seconds > 0) {
            is_running = true;
            total_seconds++;
            timer = setInterval(() => {
                total_seconds--;
                Chrono();
                
                // Temps écoulé
                if (total_seconds === 0) {
                    Chrono();
                    clearInterval(timer);
                    is_running = false;
                    alert("Temps écoulé!");
                }
            }, 1000);
        }
    }
}


// Réinitialisation du minuteur
function reset_timer() {
    clearInterval(timer);
    is_running = false;
    
    let days = parseInt(days_input.value) || 0;
    let hours = parseInt(hours_input.value) || 0;
    let minutes = parseInt(minutes_input.value) || 0;
    let seconds = parseInt(seconds_input.value) || 0;
    
    total_seconds = (days * 24 * 3600) + (hours * 3600) + (minutes * 60 + seconds);
    
    Chrono();
}

// Attribution des évènenements
start.addEventListener("click", start_timer)
reset.addEventListener("click", reset_timer)


