let nombreDeClics = 0;
let tempsRestant = 10;
let jeuActif = false;
let interval; // Déclaration de la variable interval dans un scope global
let jeuReinitialise = false;

const buttonClicker = document.getElementById('button-clicker');
const score = document.getElementById('score');
const timer = document.getElementById('timer');
const resetButton = document.getElementById('reset-button');

function lancerJeu() {
    if (jeuActif) return;

    jeuActif = true;
    nombreDeClics = 0;
    tempsRestant = 10;

    score.textContent = '0';
    timer.textContent = tempsRestant;

    buttonClicker.disabled = false;
    buttonClicker.textContent = "Clique ici !";

    interval = setInterval(() => {
        tempsRestant--;
        timer.textContent = tempsRestant;

        if (tempsRestant <= 0) {
            clearInterval(interval);
            jeuActif = false;
            buttonClicker.disabled = true;
            buttonClicker.textContent = "Temps écoulé !";
        }
    }, 1000);
}

function resetGame() {
    clearInterval(interval); // Arrêter le timer en cours
    jeuActif = false;
    nombreDeClics = 0;
    tempsRestant = 10;

    score.textContent = '0';
    timer.textContent = tempsRestant;

    buttonClicker.disabled = false;
    buttonClicker.textContent = "Clique ici !";

    jeuReinitialise = true;
}

// Lancer le jeu au premier clic
buttonClicker.addEventListener('click', () => {
    if (jeuReinitialise) {
        lancerJeu();
        jeuReinitialise = false;
    } else if (jeuActif){
        nombreDeClics++;
        score.textContent = nombreDeClics;
    }
});

// Réinitialiser le jeu
resetButton.addEventListener('click', resetGame);



