import { Graphics, Ticker } from "pixi.js";
import { Entity } from "./entity";
import { linearMap, randomInRange } from "../utils/numbers";

export class Npc extends Entity {
  private taskTime: number = 0;
  private taskMaxTime: number = 0;
  private taskRange = { min: 20000, max: 30000 };
  private taskBarMaxWidth = 16;

  private idleTime = 3000;

  private taskBar: Graphics;

  constructor() {
    super();
    this.load();
  }

  async load() {
    await this.loadSprite(0, 32);
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
    let color = 0x00a038;
    if (this.taskBarMaxWidth - barWidth <= 9) {
      color = 0xbf9f00;
    }
    if (this.taskBarMaxWidth - barWidth <= 4) {
      color = 0xff0000;
    }
    this.taskBar?.rect(0 - this.width / 2, -10, barWidth, 2).fill(color);
  };

  private createTaskBar() {
    if (!this.taskBar) {
      this.taskBar = new Graphics();
      this.addChild(this.taskBar);
    }
  }

  isTaskOver = () => {
    return this.taskMaxTime && this.taskTime >= this.taskMaxTime;
  };
}
