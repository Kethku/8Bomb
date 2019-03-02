import { getPhysicsObjects } from "./utils";
import { clear, camera } from "../canvasApi";

import { handleInput } from "./input";
import * as updateFunctions from "./update";
import * as drawFunctions from "./draw";
import { updateTerrain, drawTerrain } from "./terrain";
import * as bombFunctions from "./bombs";
import { updateExplosions, drawExplosions } from "./explosion";

import { createPhysicsObject } from "./utils";

export const initialState = {
  player: createPhysicsObject(20, 20, 0),
  bombs: [],
  explosions: [],
  cameraY: 0,
  score: 0
};

export function update(state, input) {
  let physicsObjects = getPhysicsObjects(state);

  updateTerrain(state.cameraY);

  updateFunctions.updatePhysicsObjects(physicsObjects);
  updateFunctions.handleTerrainCollisions(state.terrain, physicsObjects);
  updateFunctions.updateCamera(state);
  updateFunctions.updateScore(state);

  updateExplosions();

  handleInput(input, state.player, state.terrain);

  bombFunctions.spawnBombs(state);
  bombFunctions.updateBombs(state);
}

export function draw (state) {
  let physicsObjects = getPhysicsObjects(state);
  clear();
  camera(0, Math.floor(state.cameraY));
  drawTerrain(state.cameraY);
  drawFunctions.drawPhysicsObjects(physicsObjects);
  drawFunctions.drawScoreMarker(state);
  drawFunctions.drawInstructions(state);
  drawExplosions();
  drawFunctions.drawScore(state);
}
