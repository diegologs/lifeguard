import { Assets, Ticker } from "pixi.js";
import { Canvas } from "./canvas";
import { Npc } from "./npc";
import { Player } from "./player";
import { randomInRange } from "../utils/numbers";

export class Game {
  static instance: Game;

  public canvas: Canvas;
  private player: Player;
  private npcs: Npc[] = [];

  private playerTaskActionFactor = 5;

  private keyState: {
    [key: string]: boolean;
  } = {};

  constructor() {}

  start = async () => {
    this.canvas = new Canvas();
    await this.canvas.init();

    this.player = new Player();
    this.canvas.app.stage.addChild(this.player);
    this.player.setPosition(10, 10);

    this.createNpcs();

    this.canvas.app.ticker.add((delta: Ticker) => {
      this.player.onKeyDown(this.keyState);
      this.player.update(delta);
      this.npcs.forEach((npc) => {
        npc.update(delta);
      });
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

  createNpcs = () => {
    const npcsAmount = Math.trunc(randomInRange(4, 8));
    for (let i = 0; i <= npcsAmount; i++) {
      this.npcs.push(new Npc());
    }
    this.npcs.forEach((npc) => {
      this.canvas.app.stage.addChild(npc);
      const npcPaddingX = npc.width / 2 + 5;
      const npcPaddingY = npc.height / 2 + 10;
      const xPosition = randomInRange(npcPaddingX, this.canvas.size.width - npcPaddingX);
      const yPosition = randomInRange(npcPaddingY, this.canvas.size.height - npcPaddingX);
      npc.setPosition(xPosition, yPosition);
    });
  };

  playerNpcInteraction(delta: Ticker) {
    this.npcs.forEach((npc) => {
      if (this.player.isNearEntity(npc, 40)) {
        const isActionKeyDown = Boolean(this.keyState["e"]);
        if (isActionKeyDown) {
          npc.reduceTask(delta, this.playerTaskActionFactor);
        }
      }
    });
  }
}
