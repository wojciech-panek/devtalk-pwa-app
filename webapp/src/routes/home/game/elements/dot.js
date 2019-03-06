import { Graphics } from 'pixi.js';

export class Dot {
  constructor({ x = 0, y = 0, r = 10, fill = 0xe9e9e9 }) {
    this._stage = new Graphics();

    this.stage
      .beginFill(fill)
      .drawCircle(x, y, r);
  }

  get stage() {
    return this._stage;
  }
}
