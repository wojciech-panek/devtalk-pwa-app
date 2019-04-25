import { Graphics } from 'pixi.js';
import { InterfaceText } from './interfaceText';
import { UI_RADIUS } from '../game.constants';

export class CloseButton {
  constructor({ x, y, onClick }) {
    this._stage = new Graphics();
    this._x = x;
    this._y = y;
    this._width = 90;
    this._height = 40;

    this.drawButtonRectangle();

    this.closeText = new InterfaceText({
      text: 'CLOSE',
      anchorX: 0,
      anchorY: 0,
      x: this._x + 20,
      y: this._y + 13,
      font: 'Arial Black',
      fontSize: 12,
      fontWeight: 'normal',
      fillColor: '0xffffff',
    });

    this.stage.addChild(this.closeText.stage);

    this._stage.interactive = true;
    this._stage.on('pointerdown', onClick);
  }

  drawButtonRectangle = () => {
    this.stage.clear();
    this.stage.beginFill(0x8C0B12, 1);
    this.stage.drawRoundedRect(this._x, this._y, this._width, this._height, 2 * UI_RADIUS);
    this.stage.endFill();
  };

  get stage() {
    return this._stage;
  }

  set y(y) {
    this._y = y;
    this.closeText.y = this._y + 13;
    this.drawButtonRectangle();
  }

  set x(x) {
    this._x = x;
    this.closeText.x = this._x + 20;
    this.drawButtonRectangle();
  }
}
