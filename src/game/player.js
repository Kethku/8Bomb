import { createPhysicsObject, PhysicsObjects } from "./physics";
import { cutTerrain } from "./terrain";
import { Update, DrawUI } from "./events";

const runSpeed = 0.08;
const airSpeed = 0.02;
const jumpSpeed = 2;

export const player = createPhysicsObject(20, 20, 0);
player.digTimer = 0;

PhysicsObjects.Subscribe(() => player);

function dig(x, y, r) {
  cutTerrain(x, y, r);
  player.digTimer = 10;
}

Update.Subscribe((input) => {
  let speed = player.grounded ? runSpeed : airSpeed;
  if (input.left || input.a) {
    player.position.x -= speed;
  }
  if (input.right || input.d) {
    player.position.x += speed;
  }

  let digX = 0;
  let digY = 0;

  player.digTimer--;
  if (player.digTimer <= 0) {
    if (input.j) digX -= 4;
    if (input.l) digX += 4;
    if (input.i) digY -= 4;

    if (digX != 0 || digY != 0) {
      dig(player.position.x + digX, player.position.y + digY, 5);
    }
  }

  if (player.grounded) {
    player.jumpReady = true;
  }

  if ((input.upPressed || input.wPressed) && player.jumpReady) {
    player.previous.y += jumpSpeed;
    player.jumpReady = false;
  }
});
