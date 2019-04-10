import { Graphics } from 'pixi.js';
import { InterfaceText } from './interfaceText';
import { Coin } from './coin';
import { UI_RADIUS } from '../game.constants';

export class StoreBar {
  constructor({ x, y, width, height, name }) {
    this._stage = new Graphics();

    this.drawRectangle(x + 1, y, width - 2, 49);
    this.drawButtonRectangle(x * 13, y + 5, 90, 40);

    this.amountName = new InterfaceText({
      text: name,
      anchorX: 0,
      anchorY: 0,
      x: x + 40,
      y: y + 15,
      font: 'Arial Black',
      fontSize: 14,
      fontWeight: 'normal',
      fillColor: '0x7E6C62',
    });

    this.amount = new InterfaceText({
      text: '1',
      anchorX: 0,
      anchorY: 0,
      x: x + 170,
      y: y + 17,
      font: 'Arial Black',
      fontSize: 14,
      fontWeight: 'normal',
      fillColor: '0x6B4B3A',
    });

    this.price = new InterfaceText({
      text: '100',
      anchorX: 0,
      anchorY: 0,
      x: x * 13 + 30,
      y: y + 17,
      font: 'Arial Black',
      fontSize: 12,
      fontWeight: 'normal',
      fillColor: '0xffffff',
    });

    this.coin = new Coin({
      x: x * 13 + 55,
      y: y + 9,
      width: 30,
      height: 30,
    });

    this.stage.addChild(this.amountName.stage, this.amount.stage, this.price.stage, this.coin.stage);
  }

  drawRectangle = (x, y, width, height) => {
    this.stage.beginFill(0xffffff, 1);
    this.stage.drawRect(x, y, width, height);
    this.stage.endFill();
  };

  drawButtonRectangle = (x, y, width, height) => {
    this.stage.beginFill(0x8C0B12, 1);
    this.stage.drawRoundedRect(x, y, width, height, 2 * UI_RADIUS);
    this.stage.endFill();
  };

  get stage() {
    return this._stage;
  }
}
