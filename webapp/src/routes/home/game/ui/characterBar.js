import { Container } from 'pixi.js';
import { RectangleBox } from './rectangleBox';
import { Character } from './character';
import { InterfaceText } from './interfaceText';
import { GameState } from '../game.state';


export class CharacterBar {
  constructor({ containerSize }) {
    this._stage = new Container();

    this.characterRectangle = new RectangleBox({ x: 40, y: 6, width: containerSize.width / 2 - 50, height: 39 });
    this.characterFace = new Character({ x: 10, y: 0 });
    this.userNameText = new InterfaceText({
      text: 'FARMER',
      anchorX: 0,
      anchorY: 0,
      x: 80,
      y: 11,
      font: 'Arial Black',
      fontSize: 12,
      fontWeight: 'normal',
      fillColor: '0x6B4B3A',
    });
    this.userLevelText = new InterfaceText({
      text: `LEVEL ${this.characterLevel}`,
      anchorX: 0,
      anchorY: 0,
      x: 80,
      y: 26,
      fontSize: 11,
      fontWeight: 'bold',
      fillColor: '0xAF6C41',
    });

    this.stage.addChild(
      this.characterRectangle.stage,
      this.characterFace.stage,
      this.userNameText.stage,
      this.userLevelText.stage,
    );

    GameState.onReduxStateChange(this.handleReduxStateUpdate);
  }

  handleReduxStateUpdate = () => {
    this.userLevelText.setText(`LEVEL ${this.characterLevel}`);
  };

  get stage() {
    return this._stage;
  }

  get characterLevel() {
    if (!GameState.reduxState.fields) {
      return 0;
    }

    return GameState.reduxState.fields.filter((field) => field.amount > 0).length;
  }

  set containerSize(value) {
    this.characterRectangle.width = value.width / 2 - 50;
  }
}
