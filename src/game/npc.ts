import { Graphics, Ticker } from "pixi.js";
import { Entity } from "./entity";
import { linearMap } from "../utils/numbers";

export class Npc extends Entity {
  private taskTime: number = 0;
  private taskMaxTime: number = 0;
  private taskRange = { min: 5000, max: 10000 };
  private taskBarMaxWidth = 100;

  private taskBar: Graphics;

  constructor() {
    super();
    this.load();
  }

  async load() {
    await this.loadSprite("./assets/npc.png");
    this.setNewTask();
  }

  setNewTask() {
    this.taskMaxTime = Math.random() * (this.taskRange.max - this.taskRange.min) + this.taskRange.min;
    this.taskTime = 0;
    this.renderTask();
  }

  update = (delta: Ticker) => {
    this.increaseTask(delta, 1);
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

    this.createTaskBar();
    this.addChild(this.taskBar);
  };

  private createTaskBar() {
    console.log(this.taskTime);
    const barWidth = linearMap(this.taskTime, 0, this.taskRange.max, 0, this.taskBarMaxWidth);
    this.taskBar = new Graphics().rect(0 - this.width / 2, -40, barWidth, 10).fill(0xff00ff);
  }
}
