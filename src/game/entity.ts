import { Assets, Sprite } from "pixi.js";
import { Position } from "./interfaces/position";

export class Entity extends Sprite {
  constructor(private texturePath: string) {
    super();
    this.loadSprite();
    this.setPosition(0, 0);
  }

  loadSprite = async () => {
    const texture = await Assets.load(this.texturePath);
    this.texture = texture;
    this.anchor.set(0.5);
  };

  setPosition = (x: Position["x"], y: Position["y"]) => {
    this.x = x;
    this.y = y;
  };
}
