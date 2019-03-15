import { Container } from 'pixi.js';
import { RectangleBox } from './rectangleBox';
import { Coin } from './coin';
import { InterfaceText } from './interfaceText';

export class CoinsBar {
  constructor({ rendererWidth }) {
    this._stage = new Container();

    this.coinsRectangle = new RectangleBox({
      x: rendererWidth / 2 + 10,
      y: 6,
      width: rendererWidth / 2 - 20,
      height: 39,
    });
    this.coin = new Coin({ x: rendererWidth - 49, y: 6, width: 39, height: 39 });
    this.coinsText = new InterfaceText({
      text: 'COINS',
      anchorX: 0,
      anchorY: 0,
      x: rendererWidth / 2 + 20,
      y: 18,
      font: 'Arial Black',
      fontSize: 12,
      fontWeight: 'normal',
      fillColor: '0x6B4B3A',
    });
    this.coinsAmountText = new InterfaceText({
      text: '123456',
      anchorX: 1,
      anchorY: 0,
      x: rendererWidth - 49,
      y: 18,
      fontSize: 12,
      fontWeight: 'bold',
      fillColor: '0xAF6C41',
    });

    this.stage.addChild(this.coinsRectangle.stage, this.coinsText.stage, this.coinsAmountText.stage, this.coin.stage);
  }

  get stage() {
    return this._stage;
  }
}
