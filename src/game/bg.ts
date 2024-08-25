import { Sprite, Texture } from "pixi.js";
import { Assets } from "./assets";
import { Game } from "./game";

export class Bg {
  tileTextures: Texture[] = [];
  waterSandTexture: Texture;
  waterTexture: Texture;
  decorations: Texture[] = [];

  constructor() {
    this.load();
  }

  async load() {
    this.tileTextures.push(Assets.instance.getTexture(16, 0));
    this.tileTextures.push(Assets.instance.getTexture(16 * 2, 0));
    this.tileTextures.push(Assets.instance.getTexture(16 * 3, 0));
    this.tileTextures.push(Assets.instance.getTexture(16 * 4, 0));

    this.decorations.push(Assets.instance.getTexture(0 * 16, 16 * 3));
    this.decorations.push(Assets.instance.getTexture(16 * 1, 16 * 3));
    this.decorations.push(Assets.instance.getTexture(16 * 2, 16 * 3));

    this.waterSandTexture = Assets.instance.getTexture(16 * 5, 0);
    this.waterTexture = Assets.instance.getTexture(16 * 6, 0);

    this.loadMap();
  }

  loadMap = () => {
    const mapTilesX = Math.trunc(Game.instance.canvas.size.width / 16);
    const mapTilesY = Math.trunc(Game.instance.canvas.size.height / 16);
    for (let i = 0; i <= mapTilesX; i++) {
      for (let j = 0; j <= mapTilesY; j++) {
        let texture = this.tileTextures[Math.floor(Math.random() * this.tileTextures.length)];
        if (i === mapTilesX - 3) {
          texture = this.waterSandTexture;
        } else if (i > mapTilesX - 3) {
          texture = this.waterTexture;
        } else {
          if (Math.random() > 0.5) {
            const tileSprite = new Sprite(texture);
            tileSprite.rotation = Math.PI / 2;
          }
          if (Math.random() < 0.5) {
            const tileSprite = new Sprite(texture);
            tileSprite.rotation = -Math.PI / 2;
          }
          if (Math.random() < 0.1) {
            this.loadRandomDecoration(i * 16, j * 16);
          }
        }
        const tileSprite = new Sprite(texture);
        tileSprite.x = i * 16;
        tileSprite.y = j * 16;
        tileSprite.anchor.set(0.5);
        Game.instance.canvas.app.stage.addChild(tileSprite);
      }
    }
  };

  loadRandomDecoration = (x, y) => {
    const randomDecoration = Math.trunc(Math.random() * this.decorations.length);
    const sprite = new Sprite(this.decorations[randomDecoration]);
    sprite.x = x;
    sprite.y = y;
    sprite.zIndex = 1;
    if (randomDecoration === 1) {
      sprite.zIndex = y;
    }
    sprite.anchor.set(0.5);
    Game.instance.canvas.app.stage.addChild(sprite);
  };
}
