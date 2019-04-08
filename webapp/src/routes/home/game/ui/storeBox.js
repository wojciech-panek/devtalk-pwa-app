import { Graphics } from 'pixi.js';
import { UI_RADIUS } from '../game.constants';

export class StoreBox {
  constructor({ x, y, width, height }) {
    this._stage = new Graphics();

    this.drawRoundedRectangle(x, y, width, height);
  }

  drawRoundedRectangle = (x, y, width, height) => {
    this.stage.lineStyle(2, 0x6B4B3A, 1);
    this.stage.beginFill(0xFBF8E7, 1);
    this.stage.drawRoundedRect(x, y, width, height, UI_RADIUS);
    this.stage.endFill();
  };

  get stage() {
    return this._stage;
  }
}
