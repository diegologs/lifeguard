import { Assets, Sprite } from "pixi.js";
import { Position } from "./interfaces/position";

export class Entity extends Sprite {
  constructor() {
    super();
    this.setPosition(0, 0);
  }

  loadSprite = async (texturePath: string): Promise<void> => {
    return new Promise(async (resolve) => {
      const texture = await Assets.load(texturePath);
      this.texture = texture;
      this.anchor.set(0.5);
      resolve();
    });
  };

  setPosition = (x: Position["x"], y: Position["y"]) => {
    this.x = x;
    this.y = y;
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
