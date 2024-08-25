import { Ticker } from "pixi.js";
import PIXISound from "pixi-sound";
import { Canvas } from "./canvas";
import { Npc } from "./npc";
import { Player } from "./player";
import { randomInRange } from "../utils/numbers";
import { Bg } from "./bg";
import { SplashScreen } from "./splashscreen";

export class Game {
  static instance: Game;

  public canvas: Canvas;
  private player: Player;
  private npcs: Npc[] = [];
  private bg!: Bg;

  private splashScreen: SplashScreen;

  private playerTaskActionFactor = 5;

  private keyState: {
    [key: string]: boolean;
  } = {};

  private musicLoop: PIXISound.Sound;
  private isGameStop: boolean = false;

  constructor() {}

  start = async () => {
    await this.loadSplash();
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
      const npcPaddingX = npc.width / 2 + 8;
      const npcPaddingY = npc.height / 2 + 16;
      const xPosition = randomInRange(npcPaddingX, this.canvas.size.width - 48 - npcPaddingX);
      const yPosition = randomInRange(npcPaddingY, this.canvas.size.height - npcPaddingX);
      npc.setPosition(xPosition, yPosition);
    });
  };

  private async loadSplash() {
    this.splashScreen = new SplashScreen();
    await this.splashScreen.start();
    window.addEventListener(
      "keydown",
      () => {
        const blipSound = PIXISound.Sound.from({ url: "/assets/select.wav", volume: 0.2 });
        blipSound.play();
        setTimeout(() => {
          this.splashScreen.unload();
          this.loadGame();
        }, 300);
      },
      { once: true }
    );
  }

  private async loadGame() {
    this.isGameStop = false;
    this.canvas = new Canvas();
    await this.canvas.init();

    this.bg = new Bg();

    this.player = new Player();
    this.canvas.app.stage.addChild(this.player);
    this.player.setPosition(10, 10);

    this.npcs = [];
    this.createNpcs();

    this.canvas.app.ticker.add((delta: Ticker) => {
      this.player.onKeyDown(this.keyState, delta);
      this.player.update(delta);
      this.npcs.forEach((npc) => {
        npc.update(delta);
        if (npc.isTaskOver() && !this.isGameStop) {
          this.gameOver();
        }
      });
      this.playerNpcInteraction(delta);
    });

    this.playAmbientSounds();

    this.setEvents();
  }

  gameOver = () => {
    this.isGameStop = true;
    const gameOverSound = PIXISound.Sound.from({ url: "/assets/gameover.wav", volume: 0.2 });
    gameOverSound.play();
    setTimeout(() => {
      this.canvas.unload();
      this.musicLoop.stop();
      this.loadSplash();
    }, 500);
  };

  private playAmbientSounds() {
    this.musicLoop = PIXISound.Sound.from({ url: "/assets/ambient.wav", volume: 0.2 });
    this.musicLoop.loop = true;
    this.musicLoop.play();
  }

  playerNpcInteraction(delta: Ticker) {
    this.npcs.forEach((npc) => {
      if (this.player.isNearEntity(npc, 16)) {
        const isActionKeyDown = Boolean(this.keyState["e"]);
        if (isActionKeyDown) {
          npc.reduceTask(delta, this.playerTaskActionFactor);
        }
      }
    });
  }
}
