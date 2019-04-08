import { Graphics } from 'pixi.js';
import { InterfaceText } from './interfaceText';
import { UI_RADIUS } from '../game.constants';

export class CloseButton {
  constructor({ x, y, width }) {
    this._stage = new Graphics();

    this.drawButtonRectangle(x + width / 2 - 40, y + 200, 90, 40);

    this.closeText = new InterfaceText({
      text: 'CLOSE',
      anchorX: 0,
      anchorY: 0,
      x: x + width / 2 - 20,
      y: y + 213,
      font: 'Arial Black',
      fontSize: 12,
      fontWeight: 'normal',
      fillColor: '0xffffff',
    });

    this.stage.addChild(this.closeText.stage);
  }

  drawButtonRectangle = (x, y, width, height) => {
    this.stage.beginFill(0x000000, 1);
    this.stage.drawRoundedRect(x, y, width, height, 2 * UI_RADIUS);
    this.stage.endFill();
  };

  get stage() {
    return this._stage;
  }
}
