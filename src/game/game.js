import "babel-polyfill";

import { clear, camera } from "../canvasApi";
import { Reset, Update, DrawWorld, DrawUI } from "./events";
import { cameraX, cameraY } from "./camera";

Number.prototype.mod = function(n) {
  return ((this%n)+n)%n;
};

import "./bombs";
import "./camera";
import "./explosion";
import "./physics";
import "./player";
import "./score";
import "./terrain";
import "./UI";

Reset.Publish();

export function update(state, input) {
  Update.Publish(input);
}

export function draw (state) {
  clear();
  camera(cameraX, cameraY);
  DrawWorld.Publish();
  camera();
  DrawUI.Publish();
}
