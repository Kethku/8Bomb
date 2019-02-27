// title: Destructible Terrain

// Dev log can be found at http://02credits.com/projects/8bomb/
// The change set is described here: http://02credits.com/blog/day15-8bomb-physics/
// Update described here: http://02credits.com/blog/day17-8bomb-camera/
// Update described here: http://02credits.com/blog/day18-8bomb-camera-fixes/

function initTerrain() {
  let terrain = [];
  for (let y = 0; y < 300; y++) {
    let row = [];
    for (let x = 0; x < 128; x++) {
      if (y > 90) {
        row.push(1);
      } else {
        row.push(0);
      }
    }
    terrain.push(row);
  }
  return terrain;
}

function createPhysicsObject(x, y, sprite) {
  return {
    previous: {
      x,
      y
    },
    position: {
      x,
      y
    },
    radius: 4,
    sprite,
    grounded: false
  };
}

initialState = {
  terrain: initTerrain(),
  player: createPhysicsObject(20, 20, 0),
  bombs: [],
  cameraY: 0,
  score: 0
};

function terrainAt(x, y, terrain) {
  if (terrain[y]) {
    return terrain[y][x];
  }
  return false;
}

function getPhysicsObjects({ player, bombs }) {
  return [player].concat(bombs);
}
const gravity = 0.07;
const cameraMomentum = 0.8;
const cameraLag = 0.2;
const maxSpeed = 5;
const groundFriction = 0.99;

function updatePhysicsObjects(objects) {
  for (const obj of objects) {
    let vx = obj.position.x - obj.previous.x;
    let vy = obj.position.y - obj.previous.y;

    let speed = Math.sqrt(vx * vx + vy * vy);
    if (speed > maxSpeed) {
      vx = vx * maxSpeed / speed;
      vy = vy * maxSpeed / speed;
    } else if(obj.grounded) {
      vx = vx * groundFriction;
      vy = vy * groundFriction;
    }

    obj.previous.x = obj.position.x;
    obj.previous.y = obj.position.y;
    vy += gravity;

    obj.position.x += vx;
    obj.position.y += vy;

    if (obj.position.x - obj.radius < 0) {
      obj.position.x = obj.radius;
    }

    if (obj.position.x + obj.radius > 128) {
      obj.position.x = 128 - obj.radius;
    }
  }

  for (const first of objects) {
    for (const second of objects) {
      if (first == second) continue;
      let dx = first.position.x - second.position.x;
      let dy = first.position.y - second.position.y;

      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < first.radius + second.radius) {
        if (dy < 0) first.grounded = true;
        else second.grounded = true;
        let amount = first.radius + second.radius - distance;

        let nx = dx / distance;
        let ny = dy / distance;

        first.position.x += nx * amount / 2;
        first.position.y += ny * amount / 2;
        second.position.x -= nx * amount / 2;
        second.position.y -= ny * amount / 2;
      }
    }
  }
}

function handleTerrainCollisions(terrain, objects) {
  for (let i = 0; i < 5; i++) {
    for (const obj of objects) {
      let totalX = 0;
      let totalY = 0;
      let count = 0;
      for (let r = 0; r < Math.PI * 2; r += Math.PI / 8) {
        let dx = Math.cos(r) * obj.radius;
        let dy = Math.sin(r) * obj.radius;
        let x = Math.floor(obj.position.x + dx);
        let y = Math.floor(obj.position.y + dy);

        if (terrainAt(x, y, terrain)) {
          if (dy > 3) {
            obj.grounded = true;
          }
          totalX += dx;
          totalY += dy;
          count++;
        }
      }
      if (count == 0) {
        continue;
      }

      let dx = totalX / count;
      let dy = totalY / count;

      let length = Math.sqrt(dx * dx + dy * dy);
      let nx = dx / length;
      let ny = dy / length;

      let displacement = obj.radius - length;

      obj.position.x -= nx * displacement * 0.3;
      obj.position.y -= ny * displacement * 0.3;
    }
  }
}

function updateCamera(state) {
  if (state.previousCameraY) {
    let vy = state.cameraY - state.previousCameraY;
    state.previousCameraY = state.cameraY;
    state.cameraY += vy * cameraMomentum;
  }

  if (state.player.position.y > state.cameraY + 96) {
    let cameraDiff = state.player.position.y - (state.cameraY + 96);
    state.cameraY += cameraDiff * cameraLag;
  }

  if (state.player.position.y < state.cameraY + 32) {
    let cameraDiff = state.player.position.y - (state.cameraY + 32);
    state.cameraY += cameraDiff * 0.2;
  }

  if (!state.previousCameraY) {
    state.previousCameraY = state.cameraY;
  }
}

function updateScore(state) {
  if (state.player.position.y > state.score) {
    state.score = state.player.position.y;
  }
}
function drawTerrain({ terrain, cameraY }) {
  let top = Math.max(0, Math.floor(cameraY));
  let bottom = Math.min(Math.floor(cameraY + 128), terrain.length);
  for (let y = top; y < bottom; y++) {
    for (let x = 0; x < terrain[y].length - 1; x++) {
      if (terrainAt(x, y, terrain)) {
        if (!terrainAt(x, y - 1, terrain)) {
          setPixel(x, y, 0);
        } else if (!terrainAt(x, y + 1, terrain)) {
          setPixel(x, y, 2);
        } else {
          setPixel(x, y, 1);
        }
      }
    }
  }
}

function drawPhysicsObjects(objects) {
  for (let obj of objects) {
    sprite(obj.position.x - obj.radius, obj.position.y - obj.radius, obj.sprite);
  }
}

function drawScoreMarker({ score }) {
  sprite(0, score, 1);
  sprite(120, score, 1, 0, true);
}

function drawInstructions() {
  print(5, 5, "left/right to move");
  print(5, 13, "up to jump");
  print(5, 21, "a to cut terrain");
}
const fuzeTime = 100;
const fuzeSpeed = 0.75;
const bombRadius = 30;
const knockBack = 50;

function spawnBombs({ player,  bombs, score }) {
  if (Math.random() * 100 <= 0.5 * (score / 100)) {
    bombs.push(createPhysicsObject(Math.random() * 112 + 8, player.position.y - 300, 2));
  }
}

function updateBombs(state) {
  let bombsToExplode = [];
  let remainingBombs = [];

  for (const bomb of state.bombs) {
    if (bomb.timeLeft != undefined) {
      bomb.sprite = 2;
      bomb.timeLeft -= 1;
      if (bomb.timeLeft <= 0) {
        bomb.fuze = bomb.fuze * 0.75;
        if (bomb.fuze < 1) {
          bombsToExplode.push(bomb);
          continue;
        } else {
          bomb.timeLeft = bomb.fuze;
          bomb.sprite = 3;
        }
      }
    } else if (bomb.grounded) {
      bomb.timeLeft = fuzeTime;
      bomb.fuze = fuzeTime;
    }

    remainingBombs.push(bomb);
  }

  state.bombs = remainingBombs;

  let physicsObjects = getPhysicsObjects(state);

  for (const bomb of bombsToExplode) {
    cutTerrain(bomb.position.x, bomb.position.y, bombRadius, state.terrain);
    for (const object of physicsObjects) {
      let dx = object.position.x - bomb.position.x;
      let dy = object.position.y - bomb.position.y;

      let length = Math.sqrt(dx * dx + dy * dy);

      let nx = dx / length;
      let ny = dy / length;

      object.position.x += nx * knockBack / length;
      object.position.y += ny * knockBack / length;
    }
  }
}
function cutTerrain(x, y, r, terrain) {
  for (let cx = Math.floor(x - r); cx <= x + r; cx++) {
    for (let cy = Math.floor(y - r); cy <= y + r; cy++) {
      let dx = cx - x;
      let dy = cy - y;
      let cr = Math.floor(Math.sqrt(dx * dx + dy * dy));

      if (cr > r) continue;

      if (cy >= 0 && cy < terrain.length) {
        let row = terrain[cy];
        if (cx >= 0 && cx < row.length) {
          row[cx] = false;
        }
      }
    }
  }
}
const runSpeed = 0.05;
const airSpeed = 0.01;
const jumpSpeed = 2;

function handleInput(input, player, terrain) {
  let speed = player.grounded ? runSpeed : airSpeed;
  if (input.left) {
    player.position.x -= speed;
  }
  if (input.right) {
    player.position.x += speed;
  }

  if (input.upPressed && player.grounded) {
    player.previous.y += jumpSpeed;
    player.grounded = false;
  }

  if (input.a) {
    cutTerrain(player.position.x, player.position.y, 20, terrain);
  }
}

update = (state, input) => {
  let physicsObjects = getPhysicsObjects(state);
  updatePhysicsObjects(physicsObjects);
  handleTerrainCollisions(state.terrain, physicsObjects);
  handleInput(input, state.player, state.terrain);
  updateCamera(state);
  updateScore(state);

  spawnBombs(state);
  updateBombs(state);
};

draw = state => {
  let physicsObjects = getPhysicsObjects(state);
  clear();
  camera(0, Math.floor(state.cameraY));
  drawTerrain(state);
  drawPhysicsObjects(physicsObjects);
  drawScoreMarker(state);
  drawInstructions(state);
};

sprites = {
  "0": [
    "  3333  ",
    " 333333 ",
    "33333333",
    "33333333",
    "33333333",
    "33333333",
    " 333333 ",
    "  3333  "
  ],
  "1": [
    "5       ",
    "65      ",
    "465     ",
    "3465    ",
    "3465    ",
    "465     ",
    "65      ",
    "5       "
  ],
  "2": [
    "  6666  ",
    " 664466 ",
    "66644666",
    "66644666",
    "66644666",
    "66666666",
    " 664466 ",
    "  6666  "
  ],
  "3": [
    "  4444  ",
    " 442244 ",
    "44422444",
    "44422444",
    "44422444",
    "44444444",
    " 442244 ",
    "  4444  "
  ]
};
