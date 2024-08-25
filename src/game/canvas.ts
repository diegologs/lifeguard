import { Application } from "pixi.js";

export class Canvas {
  public app: Application;
  public size = { width: 280, height: 192 };

  constructor() {}

  public init = async (background: string = "#ffffff") => {
    this.app = new Application();
    await this.app.init({
      background: background,
      width: this.size.width,
      height: this.size.height,
      resolution: window.devicePixelRatio || 1,
    });
    this.app.stage.sortableChildren = true;
    document.body.appendChild(this.app.canvas);

    this.resize();
    window.addEventListener("resize", this.resize.bind(this));
  };

  private resize(): void {
    const scaleFactor = Math.min(window.innerWidth / this.size.width, window.innerHeight / this.size.height);
    const newWidth = Math.ceil(this.size.width * scaleFactor);
    const newHeight = Math.ceil(this.size.height * scaleFactor);

    this.app.renderer.resize(newWidth, newHeight);
    this.app.stage.scale.set(scaleFactor);
  }

  unload = () => {
    this.app.destroy();
    document.body.querySelector("canvas").remove();
  };
}
