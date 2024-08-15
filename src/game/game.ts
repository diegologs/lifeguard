import { Canvas } from "./canvas";
import { Player } from "./player";

export class Game {
  static readonly instance: Game;

  private canvas: Canvas;
  private player: Player;

  constructor() {}
  start = () => {
    this.canvas = new Canvas();
    this.player = new Player();

    this.canvas.app.stage.addChild(this.player);
    this.player.setPosition(200, 200);
  };
}
