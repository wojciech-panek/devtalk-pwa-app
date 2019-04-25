import { Graphics } from 'pixi.js';
import { UI_RADIUS } from '../game.constants';

export class RectangleBox {
  constructor({ x, y, width, height, radius = 1, color = '0xFBF8E7' }) {
    this._stage = new Graphics();
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
    this._radius = radius;
    this._color = color;

    this.drawRoundedRectangle();
  }

  drawRoundedRectangle = () => {
    this.stage.clear();
    this.stage.lineStyle(2, 0x6B4B3A, 1);
    this.stage.beginFill(this._color, 1);
    this.stage.drawRoundedRect(this._x, this._y, this._width, this._height, this._radius * UI_RADIUS);
    this.stage.endFill();
  };

  get stage() {
    return this._stage;
  }

  set height(height) {
    this._height = height;
    this.drawRoundedRectangle();
  }

  set x(x) {
    this._x = x;
    this.drawRoundedRectangle();
  }

  set y(y) {
    this._y = y;
    this.drawRoundedRectangle();
  }
}
