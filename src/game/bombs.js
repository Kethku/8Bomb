import { cutTerrain } from "./terrain";
import { newExplosion } from "./explosion";
import { player } from "./player";
import { score } from "./score";
import { createPhysicsObject, getPhysicsObjects, PhysicsObjects } from "./physics";
import { Reset, Update } from "./events";
import Vector from "./vector";

const fuzeTime = 100;
const fuzeSpeed = 0.75;
const bombRadius = 25;
const knockBack = 30;

const wrappedOffsets = [
  new Vector(0, 0),
  new Vector(128, 0),
  new Vector(-128, 0)
];

let bombs;

Reset.Subscribe(() => {
  bombs = [];
});

PhysicsObjects.Subscribe(() => bombs);

export function spawnBombs() {
  if (Math.random() * 100 <= score / 800 + 0.25) {
    bombs.push(createPhysicsObject(Math.random() * 112 + 8, player.position.y - 300, 2));
  }
}

export function updateBombs() {
  let bombsToExplode = [];
  let remainingBombs = [];

  // Update Bomb Timers
  for (const bomb of bombs) {
    if (bomb.timeLeft != undefined) {
      // Reset Bomb Sprite
      bomb.sprite = 2;
      // Decrement timer
      bomb.timeLeft -= 1;
      if (bomb.timeLeft <= 0) {
        // Halve next timer length
        bomb.fuze = bomb.fuze * 0.75;
        if (bomb.fuze < 1 && bomb.grounded) {
          // Fuze finished. Explode
          bombsToExplode.push(bomb);
          continue;
        } else {
          // Not enough iterations yet. Flicker again
          bomb.timeLeft = bomb.fuze;
          bomb.sprite = 3;
        }
      }
    } else if (bomb.grounded) {
      // Start fuze since the bomb has hit the ground
      bomb.timeLeft = fuzeTime;
      bomb.fuze = fuzeTime;
    }

    // Preserve this bomb
    remainingBombs.push(bomb);
  }
  // Preserve all remaining bombs
  bombs = remainingBombs;

  // Blog up bombs
  let physicsObjects = getPhysicsObjects();
  for (const bomb of bombsToExplode) {
    cutTerrain(bomb.position.x, bomb.position.y, bombRadius);
    newExplosion(bomb.position.x, bomb.position.y);

    for (const object of physicsObjects) {
      for (let wrappedOffset of wrappedOffsets) {
        let wrappedPosition = bomb.position.add(wrappedOffset);
        // Find the distance to the object
        let offset = object.position.subtract(wrappedPosition);
        let length = offset.length;

        // If the object is the player, and the length is less than 3/4 of the
        // bomb radius, the player has lost.
        if (object == player && length < bombRadius * 0.75) player.dead = true;

        // Otherwise knockback the object by the distance * knockBack / length^2;
        let lengthSquared = length * length;
        object.position = object.position.add(offset.multiply(knockBack/lengthSquared));
      }
    }
  }
}

Update.Subscribe(() => {
  spawnBombs();
  updateBombs();
});
