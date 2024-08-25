import { Sprite } from "pixi.js";
import { Position } from "./interfaces/position";
import { Assets } from "./assets";

export class Entity extends Sprite {
  constructor() {
    super();
    this.setPosition(0, 0);
  }

  loadSprite = async (x: number = 0, y: number = 16): Promise<void> => {
    return new Promise(async (resolve) => {
      this.texture = await Assets.instance.getTexture(x, y);
      this.anchor.set(0.5);
      resolve();
    });
  };

  setPosition = (x: Position["x"], y: Position["y"]) => {
    this.x = x;
    this.y = y;
    this.zIndex = y;
  };

  isNearEntity(entity: Entity, distance: number) {
    const xDistance = Math.abs(this.x - entity.x);
    const yDistance = Math.abs(this.y - entity.y);
    if (xDistance < distance && yDistance < distance) {
      return true;
    }
    return false;
  }
}
