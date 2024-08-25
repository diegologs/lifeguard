import { Texture, Ticker } from "pixi.js";
import PIXISound from "pixi-sound";
import { Entity } from "./entity";
import { Assets } from "./assets";
import { Game } from "./game";

export class Player extends Entity {
  private velocity = 0.5;

  private elapsedTime: number = 0;

  private runDownrames: Texture[] = [];
  private runUpFrames: Texture[] = [];
  private runLeftFrames: Texture[] = [];
  private runRightFrames: Texture[] = [];
  private currentFrame: number = 0;

  private stepsSounds: PIXISound.Sound[] = [];

  constructor() {
    super();
    this.load();
  }

  async load() {
    await this.loadSprite(16, 16);
    this.runDownrames.push(Assets.instance.getTexture(16, 16));
    this.runDownrames.push(Assets.instance.getTexture(0, 16));
    this.runDownrames.push(Assets.instance.getTexture(16 * 2, 16));

    this.runUpFrames.push(Assets.instance.getTexture(16 * 3, 16));
    this.runUpFrames.push(Assets.instance.getTexture(16 * 4, 16));

    this.runRightFrames.push(Assets.instance.getTexture(16 * 5, 16));
    this.runRightFrames.push(Assets.instance.getTexture(16 * 6, 16));

    this.runLeftFrames.push(Assets.instance.getTexture(16 * 7, 16));
    this.runLeftFrames.push(Assets.instance.getTexture(16 * 8, 16));

    this.stepsSounds.push(PIXISound.Sound.from({ url: "/assets/step1.wav", volume: 0.05 }));
    this.stepsSounds.push(PIXISound.Sound.from({ url: "/assets/step2.wav", volume: 0.05 }));
  }

  update(delta: Ticker) {}

  onKeyDown(keyState: { [key: string]: boolean }, delta: Ticker) {
    let velocity = this.velocity;

    const isWPressed = Boolean(keyState["w"]);
    const isAPressed = Boolean(keyState["a"]);
    const isSPressed = Boolean(keyState["s"]);
    const isDPressed = Boolean(keyState["d"]);

    const minX = 0;
    const minY = 0;
    const maxX = Game.instance.canvas.size.width - 60;
    const maxY = Game.instance.canvas.size.height;

    const keysPressed = () => {
      return Number(isWPressed) + Number(isAPressed) + Number(isSPressed) + Number(isDPressed);
    };

    if (keysPressed() > 1) {
      velocity = velocity * 0.75;
    }

    if (isWPressed && this.y > minY) {
      this.executeEveryMs(delta, 150, () => {
        this.changeFrame(this.runUpFrames);
        this.playStepSound();
      });
      this.y -= velocity;
    }
    if (isAPressed && this.x > minX) {
      if (keysPressed() < 2) {
        this.executeEveryMs(delta, 150, () => {
          this.changeFrame(this.runLeftFrames);
          this.playStepSound();
        });
      }
      this.x -= velocity;
    }
    if (isSPressed && this.y < maxY) {
      this.executeEveryMs(delta, 150, () => {
        this.changeFrame(this.runDownrames);
        this.playStepSound();
      });
      this.y += velocity;
    }
    if (isDPressed && this.x < maxX) {
      if (keysPressed() < 2) {
        this.executeEveryMs(delta, 150, () => {
          this.changeFrame(this.runRightFrames);
          this.playStepSound();
        });
      }
      this.x += velocity;
    }
    this.zIndex = this.y;
  }

  playStepSound = () => {
    const randomSound = Math.trunc(Math.random() * this.stepsSounds.length);
    this.stepsSounds[randomSound].play();
  };

  changeFrame(textures: Texture[]) {
    this.currentFrame = this.currentFrame + 1;
    if (this.currentFrame >= textures.length) {
      this.currentFrame = 0;
    }
    this.texture = textures[this.currentFrame];
  }

  executeEveryMs(delta: Ticker, x: number, callback: Function) {
    this.elapsedTime = (this.elapsedTime || 0) + delta.elapsedMS;
    if (this.elapsedTime >= x) {
      callback();
      this.elapsedTime = 0;
    }
  }
}
