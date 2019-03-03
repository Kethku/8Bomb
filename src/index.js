import {readFileSync} from 'fs';

import { initialState, draw, update } from "./game/game";

let currentKeys = new Set();

document.addEventListener('keydown', (event) => {
  currentKeys.add(event.key);
  event.preventDefault();
});

document.addEventListener('keyup', (event) => {
  currentKeys.delete(event.key);
  event.preventDefault();
});

let previousInput = {};
let state = initialState;
function loop() {
  let input = {};

  let reflexiveKeys = [
    "a", "s", "d", "w",
    "i", "j", "k", "l"
  ];

  let keyNames = {
    "up": "ArrowUp",
    "right": "ArrowRight",
    "down": "ArrowDown",
    "left": "ArrowLeft",
  };

  for (let reflexiveKey of reflexiveKeys) {
    keyNames[reflexiveKey] = reflexiveKey;
  }

  for (let key in keyNames) {
    input[key] = currentKeys.has(keyNames[key]);
    input[key + "Pressed"] = input[key] && !previousInput[key];
    input[key + "Released"] = !input[key] && previousInput[key];
  }
  previousInput = input;

  update(state, input);
  draw(state);
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
