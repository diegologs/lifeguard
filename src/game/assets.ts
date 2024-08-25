import { Texture, Assets as PixiAssets, Rectangle, TextureSource, TextureStyle } from "pixi.js";

export class Assets {
  static instance: Assets;

  private spriteSheet!: TextureSource;
  private spriteSize: number = 16;

  constructor() {}

  load = async () => {
    TextureStyle.defaultOptions.scaleMode = "nearest";
    return new Promise(async (resolve) => {
      this.spriteSheet = await this.loadSpriteSheet();
      resolve(true);
    });
  };

  loadSpriteSheet = async (): Promise<TextureSource> => {
    return new Promise(async (resolve) => {
      resolve(PixiAssets.load("/assets/sheet.png"));
    });
  };

  getTexture = (x: number = 0, y: number = 0, x2: number = 0, y2: number = 0) => {
    return new Texture({
      source: this.spriteSheet,
      frame: new Rectangle(x, y, x2 || this.spriteSize, y2 || this.spriteSize),
    });
  };
}
