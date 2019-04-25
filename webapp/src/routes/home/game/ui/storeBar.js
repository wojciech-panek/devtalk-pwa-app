import { Graphics, Container } from 'pixi.js';
import { InterfaceText } from './interfaceText';
import { Coin } from './coin';
import { UI_RADIUS } from '../game.constants';
import { GameState } from '../game.state';

export class StoreBar {
  constructor({ x, y, width, name, amount, price, visible, onClick }) {
    this._stage = new Graphics();
    this._stage.visible = visible;

    this._priceValue = price;

    this._button = new Container();
    this._buttonGraphics = new Graphics();
    this._button.x = x + width - 112;
    this._button.y = y + 5;
    this._button.interactive = !this.isButtonDisabled;
    this._button.on('pointerdown', onClick);

    this.drawRectangle(x + 1, y, width - 2, 49);
    this.drawButtonRectangle();

    this.amountName = new InterfaceText({
      text: name,
      anchorX: 0,
      anchorY: 0.5,
      x: x + 20,
      y: y + 24.5,
      font: 'Arial Black',
      fontSize: 12,
      fontWeight: 'normal',
      fillColor: '0x7E6C62',
    });

    this._amount = new InterfaceText({
      text: amount,
      anchorX: 0.5,
      anchorY: 0.5,
      x: x + width - 110 - x * 2,
      y: y + 24.5,
      font: 'Arial Black',
      fontSize: 12,
      fontWeight: 'normal',
      fillColor: '0x6B4B3A',
    });

    this._price = new InterfaceText({
      text: this._priceValue,
      anchorX: 0.5,
      anchorY: 0.5,
      x: x + width - 80,
      y: y + 24.5,
      font: 'Arial Black',
      fontSize: 12,
      fontWeight: 'normal',
      fillColor: '0xffffff',
    });

    this.coin = new Coin({
      x: x + width - 60,
      y: y + 9,
      width: 30,
      height: 30,
    });

    this._button.addChild(this._buttonGraphics);
    this.stage.addChild(this.amountName.stage, this._button, this._amount.stage, this._price.stage, this.coin.stage);
  }

  drawRectangle = (x, y, width, height) => {
    this.stage.beginFill(0xffffff, 1);
    this.stage.drawRect(x, y, width, height);
    this.stage.endFill();
  };

  drawButtonRectangle = () => {
    this._buttonGraphics.clear();
    this._buttonGraphics.beginFill(this.buttonColor, 1);
    this._buttonGraphics.drawRoundedRect(0, 0, 90, 40, 2 * UI_RADIUS);
    this._buttonGraphics.endFill();
  };

  get stage() {
    return this._stage;
  }

  get amount() {
    return this._amount;
  }

  set amount(value) {
    this._amount.setText(value);
  }

  get price() {
    return this._price;
  }

  set price(value) {
    this._priceValue = value;
    this._price.setText(value);
    this._button.interactive = !this.isButtonDisabled;
    this.drawButtonRectangle();
  }

  get buttonColor() {
    return this.isButtonDisabled ? 0x4A4646 : 0x8C0B12;
  }

  get isButtonDisabled() {
    return this._priceValue > GameState.reduxState.coins;
  }

  set visible(value) {
    this._stage.visible = value;
  }
}
