import { Ticker } from "pixi.js";
import { Canvas } from "./canvas";
import { Npc } from "./npc";
import { Player } from "./player";

export class Game {
  static instance: Game;

  public canvas: Canvas;
  private player: Player;
  private npc: Npc;

  private playerTaskActionFactor = 5;

  private keyState: {
    [key: string]: boolean;
  } = {};

  constructor() {}
  start = async () => {
    this.canvas = new Canvas();
    await this.canvas.init();

    this.player = new Player();
    this.npc = new Npc();

    this.canvas.app.stage.addChild(this.player);
    this.canvas.app.stage.addChild(this.npc);

    this.player.setPosition(200, 200);
    this.npc.setPosition(240, 240);

    this.canvas.app.ticker.add((delta: Ticker) => {
      this.player.onKeyDown(this.keyState);
      this.player.update(delta);
      this.npc.update(delta);

      this.playerNpcInteraction(delta);
    });

    this.setEvents();
  };

  setEvents = () => {
    window.addEventListener(
      "keydown",
      (event: KeyboardEvent) => {
        const key = event.key.toLowerCase();
        this.keyState[key] = true;
      },
      true
    );
    window.addEventListener(
      "keyup",
      (event: KeyboardEvent) => {
        const key = event.key.toLowerCase();
        this.keyState[key] = false;
      },
      true
    );
  };

  playerNpcInteraction(delta: Ticker) {
    if (this.player.isNearEntity(this.npc, 40)) {
      const isActionKeyDown = Boolean(this.keyState["e"]);
      if (isActionKeyDown) {
        this.npc.reduceTask(delta, this.playerTaskActionFactor);
      }
    }
  }
}
