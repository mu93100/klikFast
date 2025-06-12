// AVANT TOUT SEULE
// import {expect, jest, test} from '@jest/globals';

// test("essai du script ds le DOM", () => {
//   // 1. Préparer le DOM factice
//   document.body.innerHTML = `
//     <div id="score">0</div>
//     <div id="timer">5</div>
//     <button id="button-clicker">Click me!</button>
//     <button id="reset-button">Reset</button>`;

//   require('./script.js');

//   // 2. Code JS à tester
//   document.addEventListener('DOMContentLoaded', () => {
//     document.getElementById('message').textContent = " OK DOM ";
//   });

//   // 3. Simuler le chargement du DOM
//   const event = new Event('DOMContentLoaded');
//   document.dispatchEvent(event);

//   // 4. Vérifier le résultat
//   expect(document.getElementById('message').textContent).toBe(" OK DOM ");
// });

// afterEach(() => {
//   document.body.innerHTML = '';
// });



//PERPLEXITY

const {
  lancerJeu,
  afficherScore,
  afficherTimer,
  resetGame
} = require('./script.js');

describe('ClickFast - Fonctions principales', () => {
  let buttonClicker, scoreDiv, timerSpan, resetButton;

  beforeEach(() => {
    // Préparer le DOM
    document.body.innerHTML = `
      <button id="button-clicker">Clique ici !</button>
      <div id="score">0</div>
      <span id="timer">10</span>
      <button id="reset-button">Réinitialiser le jeu</button>
    `;
    // Recharger les éléments DOM pour chaque test
    buttonClicker = document.getElementById('button-clicker');
    scoreDiv = document.getElementById('score');
    timerSpan = document.getElementById('timer');
    resetButton = document.getElementById('reset-button');
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test('afficherScore affiche le nombre de clics', () => {
    // Simuler un score
    global.nombreDeClics = 5;
    afficherScore();
    expect(scoreDiv.textContent).toBe('5');
  });

  test('afficherTimer affiche le temps restant', () => {
    global.tempsRestant = 7;
    afficherTimer();
    expect(timerSpan.textContent).toBe('7');
  });

  test('lancerJeu initialise le jeu et démarre le timer', () => {
    lancerJeu();
    expect(scoreDiv.textContent).toBe('0');
    expect(timerSpan.textContent).toBe('10');
    expect(buttonClicker.disabled).toBe(false);

    // Simuler 3 secondes
    jest.advanceTimersByTime(3000);
    expect(timerSpan.textContent).toBe('7');
  });

  test('resetGame réinitialise score, timer et bouton', () => {
    // Simuler un état de jeu
    global.nombreDeClics = 3;
    global.tempsRestant = 2;
    scoreDiv.textContent = '3';
    timerSpan.textContent = '2';
    buttonClicker.disabled = true;
    buttonClicker.textContent = 'Time OUT';

    resetGame();

    expect(scoreDiv.textContent).toBe('0');
    expect(timerSpan.textContent).toBe('10');
    expect(buttonClicker.disabled).toBe(false);
    expect(buttonClicker.textContent).toBe('Clique ici !');
  });
});

// TEST time out
const {
  lancerJeu,
  resetGame
} = require('./script.js');

describe('ClickFast - Time OUT', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button id="button-clicker">Clique ici !</button>
      <div id="score">0</div>
      <span id="timer">10</span>
      <button id="reset-button">Réinitialiser le jeu</button>
    `;
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test('Le bouton affiche "Time OUT" quand le timer arrive à 0', () => {
    const buttonClicker = document.getElementById('button-clicker');
    const timerSpan = document.getElementById('timer');

    lancerJeu();

    // On simule le passage de 10 secondes
    jest.advanceTimersByTime(10000);

    expect(timerSpan.textContent).toBe("0");
    expect(buttonClicker.disabled).toBe(true);
    expect(buttonClicker.textContent).toBe("Time OUT");
  });
});