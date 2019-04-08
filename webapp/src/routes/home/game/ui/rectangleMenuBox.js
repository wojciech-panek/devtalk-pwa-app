import { Graphics } from 'pixi.js';

export class RectangleMenuBox {
  constructor({ x, y, width, height }) {
    this._stage = new Graphics();

    this.drawRectangle(x, y, width, height);
  }

  drawRectangle = (x, y, width, height) => {
    this.stage.beginFill(0x414149, 1);
    this.stage.drawRect(x, y, width, height);
    this.stage.endFill();
  };

  get stage() {
    return this._stage;
  }
}
