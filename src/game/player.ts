import { Ticker } from "pixi.js";
import { Entity } from "./entity";

export class Player extends Entity {
  private velocity = 5;

  constructor() {
    super();
    this.load();
  }

  async load() {
    await this.loadSprite("./assets/player.png");
  }

  update(delta: Ticker) {}

  onKeyDown(keyState: { [key: string]: boolean }) {
    let velocity = this.velocity;

    const isWPressed = Boolean(keyState["w"]);
    const isAPressed = Boolean(keyState["a"]);
    const isSPressed = Boolean(keyState["s"]);
    const isDPressed = Boolean(keyState["d"]);

    if (Number(isWPressed) + Number(isAPressed) + Number(isSPressed) + Number(isDPressed) >= 2) {
      velocity = velocity * 0.75;
    }
    if (isWPressed) {
      this.y -= velocity;
    }
    if (isAPressed) {
      this.x -= velocity;
    }
    if (isSPressed) {
      this.y += velocity;
    }
    if (isDPressed) {
      this.x += velocity;
    }
  }
}
