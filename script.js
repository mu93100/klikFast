// let nombreDeClics = 0;
// let tempsRestant = 10;
// let jeuActif = false;
// let interval; // Déclaration de la variable interval dans un scope global
// let jeuReinitialise = false;

// const buttonClicker = document.getElementById('button-clicker');
// const score = document.getElementById('score');
// const timer = document.getElementById('timer');
// const resetButton = document.getElementById('reset-button');

// function lancerJeu() {
//     if (jeuActif) return;

//     jeuActif = true;
//     nombreDeClics = 0;
//     tempsRestant = 10;

//     score.textContent = '0';
//     timer.textContent = tempsRestant;

//     buttonClicker.disabled = false;
//     buttonClicker.textContent = "Clique ici !";

//     interval = setInterval(() => {
//         tempsRestant--;
//         timer.textContent = tempsRestant;

//         if (tempsRestant <= 0) {
//             jeuActif = false;
//             buttonClicker.disabled = true;
//             buttonClicker.textContent = "Temps écoulé !";
//         }
//     }, 1000);
// }

// function resetGame() {
//     clearInterval(interval); // Arrêter le timer en cours
//     jeuActif = false;
//     nombreDeClics = 0;
//     tempsRestant = 10;

//     score.textContent = '0';
//     timer.textContent = tempsRestant;

//     buttonClicker.disabled = false;
//     buttonClicker.textContent = "Clique ici !";

//     jeuReinitialise = true;
// }

// // Lancer le jeu au premier clic
// buttonClicker.addEventListener('click', () => {
//     if (jeuReinitialise) {
//         lancerJeu();
//         jeuReinitialise = false;
//     } else if (jeuActif){
//         nombreDeClics++;
//         score.textContent = nombreDeClics;
//     }
// });

// // Réinitialiser le jeu
// resetButton.addEventListener('click', resetGame);



let nombreDeClics = 0;
let tempsRestant = 10;
let interval = null;
let jeuActif = false;

const buttonClicker = document.getElementById('button-clicker');
const scoreDiv = document.getElementById('score');
const timerSpan = document.getElementById('timer');
const resetButton = document.getElementById('reset-button');

// 1. Fonction pour démarrer le jeu au 1er clic
function lancerJeu() {
    if (jeuActif) return; // Empêche de relancer si déjà en cours
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

// 2. Fonction pour afficher le score
function afficherScore() {
    scoreDiv.textContent = nombreDeClics;
}

// 3. Fonction pour afficher le timer
function afficherTimer() {
    timerSpan.textContent = tempsRestant;
}

// 4. Fonction pour réinitialiser le jeu
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

// Gestion du 1er clic pour lancer le jeu et compter les clics suivants
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