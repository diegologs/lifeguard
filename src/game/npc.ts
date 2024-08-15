import { Graphics, Rectangle, Ticker } from "pixi.js";
import { Entity } from "./entity";
import { Game } from "./game";
import { linearMap } from "../utils/numbers";

export class Npc extends Entity {
  private taskTime: number = 0;
  private taskRange = { min: 5000, max: 10000 };
  private taskBarMaxWidth = 100;

  private taskBar: Graphics;

  constructor() {
    super("./assets/npc.png");
  }

  setNewTask() {
    this.taskTime = Math.random() * (this.taskRange.max - this.taskRange.min) + this.taskRange.min;
    this.createTaskBar();
  }

  update = (delta: Ticker) => {
    if (this.taskTime <= 0) {
      this.setNewTask();
    }
    this.taskTime = Math.max(this.taskTime - delta.deltaMS, 0);
    this.renderTask();
  };

  renderTask = () => {
    this.taskBar?.clear();

    this.createTaskBar();
    this.addChild(this.taskBar);
  };

  private createTaskBar() {
    const barWidth = linearMap(this.taskTime, 0, this.taskRange.max, 0, this.taskBarMaxWidth);
    this.taskBar = new Graphics().rect(0 - this.width / 2, -40, barWidth, 10).fill(0xff00ff);
  }
}
