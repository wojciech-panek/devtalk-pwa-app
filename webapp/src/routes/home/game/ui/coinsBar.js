import { Container } from 'pixi.js';
import { RectangleBox } from './rectangleBox';
import { Coin } from './coin';
import { InterfaceText } from './interfaceText';
import { GameState } from '../game.state';


export class CoinsBar {
  constructor({ containerSize }) {
    this._stage = new Container();
    this.coinsRectangle = new RectangleBox({
      x: containerSize.width / 2 + 10,
      y: 6,
      width: containerSize.width / 2 - 20,
      height: 39,
    });

    this.coin = new Coin({ x: containerSize.width - 49, y: 6, width: 39, height: 39 });
    this.coinsText = new InterfaceText({
      text: 'COINS',
      anchorX: 0,
      anchorY: 0,
      x: containerSize.width / 2 + 20,
      y: 18,
      font: 'Arial Black',
      fontSize: 12,
      fontWeight: 'normal',
      fillColor: '0x6B4B3A',
    });
    this.coinsAmountText = new InterfaceText({
      text: GameState.reduxState.coins,
      anchorX: 1,
      anchorY: 0,
      x: containerSize.width - 49,
      y: 18,
      fontSize: 12,
      fontWeight: 'bold',
      fillColor: '0xAF6C41',
    });

    this.stage.addChild(this.coinsRectangle.stage, this.coinsText.stage, this.coinsAmountText.stage, this.coin.stage);

    GameState.onReduxStateChange(this.handleReduxStateUpdate);
  }

  handleReduxStateUpdate = () => {
    this.coinsAmountText.setText(GameState.reduxState.coins);
  };

  get stage() {
    return this._stage;
  }

  set containerSize(value) {
    this.coinsRectangle.width = value.width / 2 - 20;
    this.coinsRectangle.x = value.width / 2 + 10;
    this.coinsText.x = value.width / 2 + 20;
    this.coinsAmountText.x = value.width - 49;
    this.coin.x = value.width - 49;
  }
}
