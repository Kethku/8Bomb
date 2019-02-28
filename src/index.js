import {readFileSync} from 'fs';

import { initialState, draw, update } from "./game/game";

let currentKeys = new Set();

document.addEventListener('keydown', ({ key }) => currentKeys.add(key));
document.addEventListener('keyup', ({ key }) => currentKeys.delete(key));

let previousInput = {};
let state = initialState;
function loop() {
  let input = {};

  let keyNames = {
    "up": "ArrowUp",
    "right": "ArrowRight",
    "down": "ArrowDown",
    "left": "ArrowLeft",
    "a": "a",
    "b": "b"
  };

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
