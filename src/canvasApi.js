import clamp from 'lodash/clamp';
import isNil from 'lodash/isNil';

import colors from './colors';
import alphabet from './alphabet';
import sprites from "./sprites";

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

export function getPixel(x, y) {
  x = Math.floor(x - _cameraX);
  y = Math.floor(y - _cameraY);
  if (x < 0 || x >= 128 || y < 0 || y >= 128) return 7;
  return colors.lookupInt(pixelIntegers[y * 128 + x]);
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

export function line(x1, y1, x2, y2, c = 0) {
  let steep = false;

  if (Math.abs(x1 - x2) < Math.abs(y1 - y2)) {
    ;[x1, y1] = [y1, x1]
    ;[x2, y2] = [y2, x2]
    steep = true;
  }
  if (x1 > x2) {
    ;[x1, x2] = [x2, x1]
    ;[y1, y2] = [y2, y1]
  }

  const dx = x2 - x1
  const dy = y2 - y1
  const derror = Math.abs(dy) * 2
  let error = 0
  let y = y1

  for (let x = x1; x <= x2; x++) {
    if (steep) {
      setPixel(y, x, c);
    } else {
      setPixel(x, y, c);
    }
    error += derror
    if (error > dx) {
      if (y2 > y1) {
        y++
      } else {
        y--
      }
      error -= dx * 2
    }
  }
}

const circle = ({ cx, cy, radius, color, onlyStroke }) => {
  let x = radius - 1
  let y = 0
  let dx = 1
  let dy = 1
  let err = dx - (radius << 1)

  const drawLine = ({ x0, x1, y }) => {
    line(x0, y, x1, y, color)
  }

  if (radius === 2) {
    setPixel(cx + 1, cy, color)
    setPixel(cx - 1, cy, color)
    setPixel(cx, cy + 1, color)
    setPixel(cx, cy - 1, color)
    if (!onlyStroke) {
      setPixel(cx, cy, color)
    }
  } else if (radius === 3) {
    drawLine({ x0: cx - 2, x1: cx + 2, y: cy - 2 })
    drawLine({ x0: cx - 2, x1: cx + 2, y: cy + 2 })
    if (onlyStroke) {
      setPixel(cx + 2, cy - 1, color)
      setPixel(cx + 2, cy, color)
      setPixel(cx + 2, cy + 1, color)
      setPixel(cx - 2, cy - 1, color)
      setPixel(cx - 2, cy, color)
      setPixel(cx - 2, cy + 1, color)
    } else {
      drawLine({ x0: cx - 3, x1: cx + 3, y: cy - 1 })
      drawLine({ x0: cx - 3, x1: cx + 3, y: cy })
      drawLine({ x0: cx - 3, x1: cx + 3, y: cy + 1 })
    }
  } else {
    while (x >= y) {
      if (onlyStroke) {
        setPixel(cx + x, cy + y, color)
        setPixel(cx - x, cy + y, color)
        setPixel(cx + y, cy + x, color)
        setPixel(cx - y, cy + x, color)
        setPixel(cx + x, cy - y, color)
        setPixel(cx - x, cy - y, color)
        setPixel(cx + y, cy - x, color)
        setPixel(cx - y, cy - x, color)
      } else {
        drawLine({ x0: cx + y, x1: cx - y, y: cy - x })
        drawLine({ x0: cx + x, x1: cx - x, y: cy - y })
        drawLine({ x0: cx + x, x1: cx - x, y: cy + y })
        drawLine({ x0: cx + y, x1: cx - y, y: cy + x })
      }
      if (err <= 0) {
        y++
        err += dy
        dy += 2
      }
      if (err > 0) {
        x--
        dx += 2
        err += dx - (radius << 1)
      }
    }
  }
}

export function circStroke(x, y, r, c = 0) {
  circle({
    cx: Math.floor(x),
    cy: Math.floor(y),
    radius: Math.floor(r),
    color: c,
    onlyStroke: true
  })
}

export function circFill(x, y, r, c = 0) {
  circle({
    cx: Math.floor(x),
    cy: Math.floor(y),
    radius: Math.floor(r),
    color: c
  })
}

export function rectStroke(x, y, w, h, c = 0) {
  let left = x;
  let right = x + w - 1;
  let top = y;
  let bottom = y + h - 1;
  line(left, top, right, top, c)
  line(left, bottom, right, bottom, c)
  line(left, top, left, bottom, c)
  line(right, top, right, bottom, c)
}

export function rectFill(x, y, w, h, c = 0) {
  let left = x;
  let right = x + w - 1;
  let top = y;
  let bottom = y + h - 1;

  for (let rectX = left; rectX <= right; rectX++) {
    line(rectX, top, rectX, bottom, c)
  }
}

export function clear(c) {
  pixelBuffer = new ArrayBuffer(pixelData.data.length);
  pixelBytes = new Uint8ClampedArray(pixelBuffer);
  pixelIntegers = new Uint32Array(pixelBuffer);
}
