let nombreDeClics = 0;
let tempsRestant = 10;
let interval = null;
let jeuActif = false;

const buttonClicker = document.getElementById('button-clicker');
const scoreDiv = document.getElementById('score');
const timerSpan = document.getElementById('timer');
const resetButton = document.getElementById('reset-button');

// 1. fonction pour démarrer le jeu au 1er clic
function lancerJeu() {
    if (jeuActif) return; // empêche de relancer si déjà en cours
    jeuActif = true;
    nombreDeClics = 0;
    tempsRestant = 10;
    afficherScore();
    afficherTimer();

    buttonClicker.disabled = false;
    buttonClicker.textContent = "Clique ici !";

    interval = setInterval(() => {
        tempsRestant--;
        afficherTimer();
        if (tempsRestant <= 0) {
            clearInterval(interval);
            jeuActif = false;
            buttonClicker.disabled = true;
            buttonClicker.textContent = "Time OUT"; // <-- Affiche Time OUT
            timerSpan.textContent = "0";
        }
    }, 1000);
}

// 2. fonction pour afficher le score
function afficherScore() {
    scoreDiv.textContent = nombreDeClics;
}

// 3. fonction pour afficher le timer
function afficherTimer() {
    timerSpan.textContent = tempsRestant;
}

// 4. fonction pour réinitialiser le jeu
function resetGame() {
    clearInterval(interval);
    jeuActif = false;
    nombreDeClics = 0;
    tempsRestant = 10;
    afficherScore();
    afficherTimer();
    buttonClicker.disabled = false;
    buttonClicker.textContent = "Clique ici !"; // <-- Réinitialise le texte du bouton
}

// gestion du 1er clic pour lancer le jeu et compter les clics suivants
buttonClicker.addEventListener('click', function () {
    if (!jeuActif) {
        lancerJeu();
    }
    if (jeuActif && tempsRestant > 0) {
        nombreDeClics++;
        afficherScore();
    }
});

// Le bouton reset appelle déjà resetGame() via onclick dans le HTML

// Optionnel : initialiser l'affichage au chargement
afficherScore();
afficherTimer();


//PERPLEXITY rajout suite test unitaires

if (typeof module !== "undefined") {
    module.exports = { lancerJeu, afficherScore, afficherTimer, resetGame };
}

  /* === pour que la page ne grossisse pas au click sur mobile  */
// Bloque double tap zoom
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    let now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
    event.preventDefault();
    }
    lastTouchEnd = now;
}, false);