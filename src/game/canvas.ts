import { Application } from "pixi.js";

export class Canvas {
  public app: Application;
  public size = { width: 280, height: 192 };
  public background = "#ffffff";

  constructor() {
    this.initiCanvas();
  }

  private initiCanvas = async () => {
    this.app = new Application();
    await this.app.init({
      background: this.background,
      resizeTo: window,
      width: this.size.width,
      height: this.size.height,
    });
    document.body.appendChild(this.app.canvas);
  };
}
