import { cutTerrain } from "./terrain";

const runSpeed = 0.05;
const airSpeed = 0.01;
const jumpSpeed = 2;

export function handleInput(input, player, terrain) {
  let speed = player.grounded ? runSpeed : airSpeed;
  if (input.left) {
    player.position.x -= speed;
  }
  if (input.right) {
    player.position.x += speed;
  }

  if (player.grounded) {
    player.jumpReady = true;
  }

  if (input.upPressed && player.jumpReady) {
    player.previous.y += jumpSpeed;
    player.jumpReady = false;
  }

  if (input.a) {
    cutTerrain(player.position.x, player.position.y, 30);
  }
}
