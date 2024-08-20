import { Graphics, Ticker } from "pixi.js";
import { Entity } from "./entity";
import { linearMap, randomInRange } from "../utils/numbers";

export class Npc extends Entity {
  private taskTime: number = 0;
  private taskMaxTime: number = 0;
  private taskRange = { min: 20000, max: 30000 };
  private taskBarMaxWidth = 100;

  private idleTime = 3000;

  private taskBar: Graphics;

  constructor() {
    super();
    this.load();
  }

  async load() {
    await this.loadSprite("./assets/npc.png");
    this.setIdleTime();
    this.createTaskBar();
  }

  setIdleTime() {
    this.idleTime = randomInRange(8000, 50000);
  }

  setNewTask() {
    this.taskMaxTime = randomInRange(this.taskRange.min, this.taskRange.max);
    this.taskTime = 1;
    this.renderTask();
  }

  update = (delta: Ticker) => {
    console.log(this.idleTime, this.taskTime);
    if (this.idleTime === 0 && this.taskTime === 0) {
      this.setNewTask();
      this.setIdleTime();
      return;
    }
    if (this.taskTime > 0) {
      this.increaseTask(delta, 1);
      return;
    }
    if (this.taskTime === 0 && this.idleTime > 0) {
      this.taskBar?.clear();
      this.decreaseIdle(delta, 1);
      return;
    }
  };

  decreaseIdle = (delta: Ticker, factor: number) => {
    this.idleTime = Math.max(this.idleTime - delta.deltaMS * factor, 0);
  };

  reduceTask = (delta: Ticker, factor: number) => {
    this.taskTime = Math.max(this.taskTime - delta.deltaMS * factor, 0);
    this.renderTask();
  };

  increaseTask = (delta: Ticker, factor: number) => {
    this.taskTime = Math.min(this.taskTime + delta.deltaMS * factor, this.taskMaxTime);
    this.renderTask();
  };

  renderTask = () => {
    this.taskBar?.clear();
    const barWidth = linearMap(this.taskTime, 0, this.taskRange.max, 0, this.taskBarMaxWidth);
    this.taskBar?.rect(0 - this.width / 2, -40, barWidth, 10).fill(0xff00ff);
  };

  private createTaskBar() {
    if (!this.taskBar) {
      this.taskBar = new Graphics();
      this.addChild(this.taskBar);
    }
  }
}
