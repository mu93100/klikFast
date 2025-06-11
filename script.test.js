import {expect, jest, test} from '@jest/globals';

test("essai du script ds le DOM", () => {
  // 1. Préparer le DOM factice
  document.body.innerHTML = `
    <div id="score">0</div>
    <div id="timer">5</div>
    <button id="button-clicker">Click me!</button>
    <button id="reset-button">Reset</button>`;

  require('script.js');

  // 2. Code JS à tester
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('message').textContent = " OK DOM ";
  });

  // 3. Simuler le chargement du DOM
  const event = new Event('DOMContentLoaded');
  document.dispatchEvent(event);

  // 4. Vérifier le résultat
  expect(document.getElementById('message').textContent).toBe(" OK DOM ");
});

afterEach(() => {
  document.body.innerHTML = '';
});