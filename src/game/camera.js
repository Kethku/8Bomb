import { player } from "./player";
import { Update } from "./events";

const cameraMomentum = 0.8;
const cameraLag = 0.2;
const shakeFalloff = 0.7;

let previousCameraPosition = 0;
let cameraPosition = 0;
let shake = 0;

export let cameraY = 0;
export let cameraX = 0;

export function shakeCamera(amount) {
  shake = amount;
}

Update.Subscribe(() => {
  shake *= shakeFalloff;

  let vy = cameraPosition - previousCameraPosition;
  previousCameraPosition = cameraPosition;
  cameraPosition += vy * cameraMomentum;

  if (player.position.y > cameraPosition + 96) {
    let cameraDiff = player.position.y - (cameraPosition + 96);
    cameraPosition += cameraDiff * cameraLag;
  }

  if (player.position.y < cameraPosition + 32) {
    let cameraDiff = player.position.y - (cameraPosition + 32);
    cameraPosition += cameraDiff * 0.2;
  }

  cameraX = Math.random() * shake;
  cameraY = cameraPosition + Math.random() * shake;
});

