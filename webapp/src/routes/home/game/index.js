import { Application } from 'pixi.js';
import { Background } from './elements/background';

export class Game {
  constructor({ htmlElement }) {
    this._htmlElement = htmlElement;
    this._app = new Application({
      transparent: true,
      antialias: true,
      autoResize: true,
      resolution: window.devicePixelRatio,
      width: this.width,
      height: this.height,
    });

    this.htmlElement.append(this._app.renderer.view);

    this.background = new Background({ width: this.width, height: this.height });

    this.stage.addChild(this.background.stage);
  }


  get htmlElement() {
    return this._htmlElement;
  }

  get width() {
    return this._htmlElement.offsetWidth;
  }

  get height() {
    return this._htmlElement.offsetHeight;
  }

  get stage() {
    return this._app.stage;
  }

  get ticker() {
    return this._app.ticker;
  }
}
