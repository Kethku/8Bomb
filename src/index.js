import {readFileSync} from 'fs';
import clamp from 'lodash/clamp';
import isNil from 'lodash/isNil';
import colors from './colors';
import printText from "./print";

let gameCode = readFileSync(__dirname + "/game.js", 'utf-8');

let canvas = document.getElementById('game');
let ctx = canvas.getContext('2d');

let _cameraX = 0;
let _cameraY = 0;

function camera(x = 0, y = 0) {
  _cameraX = Math.floor(x);
  _cameraY = Math.floor(y);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.translate(-_cameraX, -_cameraY);
}

function setPixel(x, y, c = 0) {
  ctx.fillStyle = colors.rgb(c);
  ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
}

function sprite(x, y, spriteIndex, darken = 0, flipH = false, flipV = false) {
  if (window.sprites[spriteIndex]) {
    window.sprites[spriteIndex].slice(0, 8).forEach((cells, rowIndex) => {
      cells.split('').forEach((color, colIndex) => {
        if (color !== ' ') {
          const clamped = clamp(+color - darken, 0, 7);
          ctx.fillStyle = colors.rgb(clamped);
          ctx.fillRect(
            Math.floor(x) + (flipH ? 7 - colIndex : colIndex),
            Math.floor(y) + (flipV ? 7 - rowIndex : rowIndex),
            1,
            1
          );
        }
      });
    });
  }
}

function print(x, y, letters, c = 0) {
  printText({
    x: x - _cameraX,
    y: y - _cameraY,
    letters,
    c,
    ctx
  });
}

function clear(c) {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  if (!isNil(c)) {
    ctx.fillStyle = colors.rgb(c);
    ctx.fillRect(0, 0, 128, 128);
  } else {
    ctx.clearRect(0, 0, 128, 128);
  }
  ctx.restore();
}

window.initialState = "";
window.draw = () => {};
window.update = () => {};
window.sprites = {};

let currentKeys = new Set();

document.addEventListener('keydown', ({ key }) => currentKeys.add(key));
document.addEventListener('keyup', ({ key }) => currentKeys.delete(key));

eval(gameCode);

let previousInput = {};
let state = window.initialState;
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

  window.update(state, input);
  window.draw(state);
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
