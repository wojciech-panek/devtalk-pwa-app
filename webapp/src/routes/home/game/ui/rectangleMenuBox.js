import { Graphics } from 'pixi.js';
import { MenuButton } from './menuButton';

export class RectangleMenuBox {
  constructor({ x, y, width, height, type }) {
    this._stage = new Graphics();

    this.drawRectangle(x, y, width, height, type);
    this.menuButton = new MenuButton({ x: 40, y: 40, width: 40, height: 40, type: type });
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
