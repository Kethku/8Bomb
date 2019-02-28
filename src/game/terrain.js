import { setPixel } from "../canvasApi";

const panelHeight = 100;
const panelWidth = 128;
const terrainStart = 70;

let lowestPanel = 0;
let terrain = {};

function createPanel() {
  let panel = [];
  for (let y = 0; y < 100; y++) {
    let row = [];
    for (let x = 0; x < 128; x++) {
      row.push(true);
    }
    panel.push(row);
  }
  return panel;
}

export function updateTerrain(cameraY) {
  let panelTop = Math.floor(cameraY / panelHeight) - 1;
  let panelBottom = panelTop + 5;

  for (let i = panelTop; i < panelBottom; i++) {
    if (!terrain[i]) {
      terrain[i] = createPanel();
      if (lowestPanel < i) lowestPanel = i;
    }
  }
}

export function terrainAt(x, y) {
  if (y < terrainStart) return false;
  let panelNumber = Math.floor(y / panelHeight);
  let panel = terrain[panelNumber];
  let panelY = y - (panelNumber * panelHeight);
  if (panel && panelNumber != lowestPanel) {
    return panel[panelY][x];
  }
  return false;
}

export function setTerrainAt(x, y, value) {
  let panelNumber = Math.floor(y / panelHeight);
  let panel = terrain[panelNumber];

  if (panel) {
    let panelY = y - (panelNumber * panelHeight);
    let row = panel[panelY];
    if (x >= 0 && x < row.length) {
      row[x] = value;
    }
  }
}

export function cutTerrain(x, y, r) {
  for (let cx = Math.floor(x - r); cx <= x + r; cx++) {
    for (let cy = Math.floor(y - r); cy <= y + r; cy++) {
      let dx = cx - x;
      let dy = cy - y;
      let cr = Math.floor(Math.sqrt(dx * dx + dy * dy));

      if (cr > r) continue;
      setTerrainAt(cx, cy, false);
    }
  }
}

export function drawTerrain(cameraY) {
  let top = Math.max(0, Math.floor(cameraY));
  let bottom = Math.floor(cameraY + 128);
  for (let y = top; y < bottom; y++) {
    for (let x = 0; x < panelWidth - 1; x++) {
      if (terrainAt(x, y)) {
        if (!terrainAt(x, y - 1)) {
          setPixel(x, y, 0);
        } else if (!terrainAt(x, y + 1)) {
          setPixel(x, y, 2);
        } else {
          setPixel(x, y, 1);
        }
      }
    }
  }
}
