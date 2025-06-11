let nombreDeClics = 0;
let tempsRestant = 10;
let jeuActif = false;
let interval; // Déclaration de la variable interval dans un scope global
let jeuRéinitialisé = false;

const bouton = document.getElementById('button-clicker');
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

    bouton.disabled = false;
    bouton.textContent = "Clique ici !";

    interval = setInterval(() => {
        tempsRestant--;
        timer.textContent = tempsRestant;

        if (tempsRestant <= 0) {
            clearInterval(interval);
            jeuActif = false;
            bouton.disabled = true;
            bouton.textContent = "Temps écoulé !";
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

    bouton.disabled = false;
    bouton.textContent = "Clique ici !";

    jeuRéinitialisé = true;
}

// Lancer le jeu au premier clic
bouton.addEventListener('click', () => {
    if (jeuRéinitialisé) {
        lancerJeu();
        jeuRéinitialisé = false;
    } else if (jeuActif){
        nombreDeClics++;
        score.textContent = nombreDeClics;
    }
});

// Réinitialiser le jeu
resetButton.addEventListener('click', resetGame);



