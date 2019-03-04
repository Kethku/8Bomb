import { createPhysicsObject, PhysicsObjects } from "./physics";
import { cutTerrain } from "./terrain";
import { Reset, Update, DrawUI } from "./events";

const runSpeed = 0.08;
const airSpeed = 0.02;
const jumpSpeed = 2;

export let player;

Reset.Subscribe(() => {
  player = createPhysicsObject(20, 20, 0);
});

PhysicsObjects.Subscribe(() => {
  if (!player.dead) return player;
  else return [];
});

Update.Subscribe((input) => {
  if (player.dead) {
    if (input.upPressed || input.wPressed) Reset.Publish();
  } else {
    let speed = player.grounded ? runSpeed : airSpeed;
    if (input.left || input.a) {
      player.position.x -= speed;
    }
    if (input.right || input.d) {
      player.position.x += speed;
    }

    if (player.grounded) {
      player.jumpReady = true;
    }

    if ((input.upPressed || input.wPressed) && player.jumpReady) {
      player.previous.y += jumpSpeed;
      player.jumpReady = false;
    }
  }
});
