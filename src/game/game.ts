import { Canvas } from "./canvas";
import { Npc } from "./npc";
import { Player } from "./player";

export class Game {
  static readonly instance: Game;

  private canvas: Canvas;
  private player: Player;
  private npc: Npc;

  constructor() {}
  start = () => {
    this.canvas = new Canvas();
    this.player = new Player();
    this.npc = new Npc();

    this.canvas.app.stage.addChild(this.player);
    this.canvas.app.stage.addChild(this.npc);

    this.player.setPosition(200, 200);
    this.npc.setPosition(240, 240);
  };
}
