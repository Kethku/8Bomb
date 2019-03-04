import { setPixel } from "../canvasApi";
import { Reset, Update, DrawWorld } from "./events";
import { cameraY } from "./camera";
import Vector from "./vector";
import { mod } from "./utils";

const panelHeight = 100;
const panelWidth = 128;
const terrainStart = 70;

let lowestPanel, terrain;

Reset.Subscribe(() => {
  lowestPanel = 0;
  terrain = {};
});

export function terrainAt(x, y) {
  if (y < terrainStart) return false;
  let panelNumber = Math.floor(y / panelHeight);
  let panel = terrain[panelNumber];
  let panelY = y - (panelNumber * panelHeight);
  if (panel && panelNumber != lowestPanel) {
    return panel[panelY][mod(x, 128)];
  }
  return false;
}

export function setTerrainAt(x, y, value) {
  let panelNumber = Math.floor(y / panelHeight);
  let panel = terrain[panelNumber];

  if (panel) {
    let panelY = y - (panelNumber * panelHeight);
    let row = panel[panelY];
    row[mod(x, 128)] = value;
  }
}

export function colorAt(x, y) {
  let panelNumber = Math.floor(y / panelHeight);
  let panel = terrain[panelNumber];
  let panelY = y - (panelNumber * panelHeight);

  if (!panel) return 7;

  for (let stone of panel.stones) {
    let dx = stone.x - x;
    let dy = stone.y - panelY;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < stone.r) {
      return stone.c;
    }
  }

  let color = 1;
  if (!terrainAt(x, y - 1)) {
    color -= 1;
  } else if (!terrainAt(x, y + 1)) {
    color += 1;
  }
  return color;
}

export function cutTerrain(x, y, r) {
  let center = new Vector(x, y);
  let radius = new Vector(r, r);
  let topLeft = center.subtract(radius).floor();
  let bottomRight = center.add(radius).floor();

  for (let pixel of Vector.InRectangle(topLeft, bottomRight)) {
    let offset = center.subtract(pixel);
    if (offset.length > r) continue;
    setTerrainAt(pixel.x, pixel.y, false);
  }
}

function createPanel() {
  let panel = [];
  let stones = [];
  for (let y = 0; y < 100; y++) {
    let row = [];
    for (let x = 0; x < 128; x++) {
      row.push(true);
    }
    panel.push(row);
  }

  for (let i = 0; i < 10; i++) {
    if (Math.random() * 100 < 40) {
      stones.push({
        x: Math.random() * 128,
        y: Math.random() * panelHeight,
        r: Math.random() * 5,
        c: Math.floor(Math.random() * 3) + 4
      });
    }
  }
  panel.stones = stones;
  return panel;
}

Update.Subscribe(() => {
  let panelTop = Math.floor(cameraY / panelHeight) - 1;
  let panelBottom = panelTop + 5;

  for (let i = panelTop; i < panelBottom; i++) {
    if (!terrain[i]) {
      terrain[i] = createPanel();
      if (lowestPanel < i) lowestPanel = i;
    }
  }
});

DrawWorld.Subscribe(() => {
  let top = Math.max(0, Math.floor(cameraY));
  let bottom = Math.floor(cameraY + 128);
  for (let pixel of Vector.InRectangle(new Vector(0, top), new Vector(panelWidth, bottom))) {
    if (terrainAt(pixel.x, pixel.y)) {
      setPixel(pixel.x, pixel.y, colorAt(pixel.x, pixel.y));
    }
  }
});
