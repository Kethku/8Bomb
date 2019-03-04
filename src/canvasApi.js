import clamp from 'lodash/clamp';
import isNil from 'lodash/isNil';

import colors from './colors';
import alphabet from './alphabet';
import sprites from "./sprites";
import printText from "./print";

let canvas = document.getElementById('game');
let ctx = canvas.getContext('2d');

canvas.focus();

let _cameraX = 0;
let _cameraY = 0;

let pixelData = ctx.getImageData(0, 0, 128, 128);
let pixelBuffer = new ArrayBuffer(pixelData.data.length);
let pixelBytes = new Uint8ClampedArray(pixelBuffer);
let pixelIntegers = new Uint32Array(pixelBuffer);

export function drawPixels() {
  pixelData.data.set(pixelBytes);
  ctx.putImageData(pixelData, 0, 0);
}

export function camera(x = 0, y = 0) {
  _cameraX = Math.floor(x);
  _cameraY = Math.floor(y);
}

export function setPixel(x, y, c = 0) {
  x = Math.floor(x - _cameraX);
  y = Math.floor(y - _cameraY);
  if (x < 0 || x >= 128 || y < 0 || y >= 128) return;
  pixelIntegers[y * 128 + x] = colors.int(c);
}

export function sprite(x, y, spriteIndex, darken = 0, flipH = false, flipV = false) {
  if (x < _cameraX - 8 || x > _cameraX + 128) return;
  if (y < _cameraY - 8 || y > _cameraY + 128) return;

  if (sprites[spriteIndex]) {
    sprites[spriteIndex].slice(0, 8).forEach((cells, rowIndex) => {
      cells.split('').forEach((color, colIndex) => {
        if (color !== ' ') {
          const clamped = clamp(+color - darken, 0, 7);
          setPixel(
            Math.floor(x) + (flipH ? 7 - colIndex : colIndex),
            Math.floor(y) + (flipV ? 7 - rowIndex : rowIndex),
            clamped);
        }
      });
    });
  }
}

export function print(x, y, letters, c = 0) {
  let currentX = Math.floor(x - _cameraX);
  let currentY = Math.floor(y - _cameraY);

  for (let letter of letters.toString().split('')) {
    const pixels = alphabet[letter.toLowerCase()];
    if (!pixels) currentX += 3; // Couldn't find a character

    let letterWidth = pixels.length / 6;
    for (let x = 0; x < letterWidth; x++) {
      for (let y = 0; y < 6; y++) {
        if (pixels[y * letterWidth + x]) {
          setPixel(currentX + x, currentY + y, c);
        }
      }
    }
    currentX += letterWidth + 1;
  }
}

export function clear(c) {
  pixelBuffer = new ArrayBuffer(pixelData.data.length);
  pixelBytes = new Uint8ClampedArray(pixelBuffer);
  pixelIntegers = new Uint32Array(pixelBuffer);
}
