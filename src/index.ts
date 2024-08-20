import { Game } from "./game/game";
import { Assets } from "./game/assets";

const start = async () => {
  Assets.instance = new Assets();
  await Assets.instance.load();

  Game.instance = new Game();
  Game.instance.start();
};

start();
