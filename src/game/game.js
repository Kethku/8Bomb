import "babel-polyfill";

import { clear, camera } from "../canvasApi";

import * as drawFunctions from "./draw";
import * as bombFunctions from "./bombs";
import { updateExplosions, drawExplosions } from "./explosion";
import { Update, DrawWorld, DrawUI } from "./events";

import { createPhysicsObject } from "./physics";
import { cameraX, cameraY } from "./camera";

import "./terrain";
import "./score";

export function update(state, input) {
  Update.Publish(input);
}

export function draw (state) {
  clear();
  camera(cameraX, cameraY);
  DrawWorld.Publish();
  camera();
  DrawUI.Publish();
  drawFunctions.drawInstructions(state);
}

if (module.hot) {
  module.hot.dispose(function () {
    window.location.reload();
  });
}
