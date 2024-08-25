import { Sprite, Ticker } from "pixi.js";
import { Assets } from "./assets";
import { Canvas } from "./canvas";

export class SplashScreen {
  private canvas: Canvas;
  2;
  private titleAnimationTime = 0;
  private titleSprite: Sprite;

  constructor() {}

  start = async () => {
    this.canvas = new Canvas();
    await this.canvas.init("#23adde");

    const titleTexture = Assets.instance.getTexture(0, 16 * 7, 16 * 6, 16 * 8);
    this.titleSprite = new Sprite(titleTexture);
    this.titleSprite.anchor.set(0.5);
    this.titleSprite.x = this.canvas.size.width / 2;
    this.titleSprite.y = this.canvas.size.height / 2 + 50;
    this.titleSprite.scale.set(1.6, 1.6);
    this.canvas.app.stage.addChild(this.titleSprite);

    this.loadControlsSprites();

    this.update();
  };

  loadControlsSprites = () => {
    const controlsTexture = Assets.instance.getTexture(0, 16 * 4, 16 * 11, 10 * 5);
    const controlsSprite = new Sprite(controlsTexture);
    controlsSprite.anchor.set(0.5);
    controlsSprite.x = this.canvas.size.width / 2;
    controlsSprite.y = this.canvas.size.height / 2 + 50;
    this.canvas.app.stage.addChild(controlsSprite);
  };

  update = () => {
    this.canvas.app.ticker.add((delta: Ticker) => {
      if (this.titleAnimationTime < 1500) {
        this.titleSprite.y += delta.deltaMS * 0.005;
      } else {
        this.titleSprite.y -= delta.deltaMS * 0.005;
      }
      this.titleAnimationTime += delta.deltaMS;
      if (this.titleAnimationTime >= 3000) {
        this.titleAnimationTime = 0;
      }
    });
  };

  unload = () => {
    this.canvas.unload();
  };
}
