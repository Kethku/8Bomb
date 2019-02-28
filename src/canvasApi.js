import clamp from 'lodash/clamp';
import isNil from 'lodash/isNil';

import colors from './colors';
import sprites from "./sprites";
import printText from "./print";

let canvas = document.getElementById('game');
let ctx = canvas.getContext('2d');

canvas.focus();

let _cameraX = 0;
let _cameraY = 0;

export function camera(x = 0, y = 0) {
  _cameraX = Math.floor(x);
  _cameraY = Math.floor(y);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.translate(-_cameraX, -_cameraY);
}

export function setPixel(x, y, c = 0) {
  ctx.fillStyle = colors.rgb(c);
  ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
}

export function sprite(x, y, spriteIndex, darken = 0, flipH = false, flipV = false) {
  if (x < _cameraX - 8 || x > _cameraX + 128) return;
  if (y < _cameraY - 8 || y > _cameraY + 128) return;

  if (sprites[spriteIndex]) {
    sprites[spriteIndex].slice(0, 8).forEach((cells, rowIndex) => {
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

export function print(x, y, letters, c = 0) {
  let ty = y - _cameraY;
  if (ty < -8 || ty > 128) return;
  printText({
    x: x - _cameraX,
    y: ty,
    letters,
    c,
    ctx
  });
}

export function clear(c) {
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
