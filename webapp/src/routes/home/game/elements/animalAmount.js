import { Graphics } from 'pixi.js';
import { InterfaceText } from '../ui/interfaceText';
import { GameState } from '../game.state';


export class AnimalAmount {
  constructor({ flip, positionNumber }) {
    this._stage = new Graphics();
    this._positionNumber = positionNumber;

    this.stage.x = flip ? 42 : -42;
    this.stage.y = -40;

    this.drawCircle();

    this.amount = new InterfaceText({
      text: `${this.animalData.amount}`,
      anchorX: 0.5,
      anchorY: 0.5,
      x: 0,
      y: 0,
      fontSize: 11,
      fontWeight: 'bold',
      fillColor: '0x6B4B3A',
    });

    this.stage.addChild(this.amount.stage);

    GameState.onReduxStateChange(this.handleReduxStateUpdate);
  }

  drawCircle = () => {
    this.stage.lineStyle(1, 0x000000, 0.5);
    this.stage.beginFill(0xFBF8E7, 1);
    this.stage.drawCircle(0, 0, 9);
    this.stage.endFill();
  };

  flipHorizontally(sprite) {
    sprite.scale.x *= -1;
  }

  handleReduxStateUpdate = () => {
    this.amount.setText(`${this.animalData ? this.animalData.amount : ''}`);
  };

  get stage() {
    return this._stage;
  }

  get fieldIndex() {
    if (!GameState.reduxState.fields) {
      return -1;
    }

    return GameState.reduxState.fields.findIndex((field) => field.position === this.positionNumber);
  }

  get positionNumber() {
    return this._positionNumber;
  }

  get animalData() {
    if (this.fieldIndex === -1) {
      return null;
    }

    return GameState.reduxState.fields[this.fieldIndex];
  }
}
