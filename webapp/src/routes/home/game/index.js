import { Application } from 'pixi.js';
import TWEEN from '@tweenjs/tween.js';
import { Dot } from './elements/dot';

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

    this.exampleDot = new Dot({
      x: this.width / 2,
      y: this.height / 2,
      r: 100,
    });

    this.stage.addChild(this.exampleDot.stage);
    this.ticker.add(this.handleTick);

    this.animateDot();
  }

  animateDot = () => new TWEEN.Tween(this.exampleDot.stage.transform.scale)
    .to({ x: 2, y: 2 }, 3000)
    .easing(TWEEN.Easing.Quadratic.Out)
    .repeat(Infinity)
    .start();

  handleTick = () => TWEEN.update();

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
