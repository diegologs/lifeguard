import { Assets, Sprite, Texture } from "pixi.js";
import { Position } from "./interfaces/position";

export class Player extends Sprite {
  constructor() {
    super();
    this.loadSprite();
    this.setPosition(0, 0);
  }

  loadSprite = async () => {
    const texture = await Assets.load("/assets/player.png");
    this.texture = texture;
    this.anchor.set(0.5);
  };

  setPosition = (x: Position["x"], y: Position["y"]) => {
    this.x = x;
    this.y = y;
  };
}
