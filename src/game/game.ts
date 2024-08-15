import { Ticker } from "pixi.js";
import { Canvas } from "./canvas";
import { Npc } from "./npc";
import { Player } from "./player";

export class Game {
  static readonly instance: Game;

  public canvas: Canvas;
  private player: Player;
  private npc: Npc;
  private npc2: Npc;

  constructor() {}
  start = async () => {
    this.canvas = new Canvas();
    await this.canvas.init();

    this.player = new Player();
    this.npc = new Npc();
    this.npc2 = new Npc();

    this.canvas.app.stage.addChild(this.player);
    this.canvas.app.stage.addChild(this.npc);
    this.canvas.app.stage.addChild(this.npc2);

    this.player.setPosition(200, 200);

    this.npc.setPosition(240, 240);
    this.npc2.setPosition(300, 300);

    this.npc.setNewTask();
    this.npc2.setNewTask();

    this.canvas.app.ticker.add((delta: Ticker) => {
      this.npc.update(delta);
      this.npc2.update(delta);
    });
  };
}
