let nombreDeClics = 0;
let tempsRestant = 10; // Durée du jeu en secondes
let jeuActif = false;

const bouton = document.getElementById('button-clicker');
const score = document.getElementById('score');
const timer = document.getElementById('timer');

function lancerJeu() {
    if (jeuActif) return; // Empêche de relancer

    jeuActif = true;
    nombreDeClics = 0;
    tempsRestant = 10;

    score.textContent = '0';
    timer.textContent = tempsRestant;

    bouton.disabled = false;
    bouton.textContent = "Clique ici !";

    const interval = setInterval(() => {
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

// Compte les clics si le jeu est actif
bouton.addEventListener('click', () => {
    if (!jeuActif) {
        lancerJeu(); // Démarre le jeu au 1er clic
    }

    if (jeuActif) {
        nombreDeClics++;
        score.textContent = nombreDeClics;
    }
});