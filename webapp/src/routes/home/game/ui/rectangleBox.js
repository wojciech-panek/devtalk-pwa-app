import { Graphics } from 'pixi.js';
import { UI_RADIUS } from '../game.constants';

export class RectangleBox {
  constructor({ x, y, width, height, radius, color }) {
    this._stage = new Graphics();

    this.drawRoundedRectangle(x, y, width, height, radius, color);
  }

  drawRoundedRectangle = (x, y, width, height, radius = 1, color = '0xFBF8E7') => {
    this.stage.lineStyle(2, 0x6B4B3A, 1);
    this.stage.beginFill(color, 1);
    this.stage.drawRoundedRect(x, y, width, height, radius * UI_RADIUS);
    this.stage.endFill();
  };

  get stage() {
    return this._stage;
  }
}
