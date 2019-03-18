import { Container } from 'pixi.js';
import { RectangleBox } from './rectangleBox';
import { Character } from './character';
import { InterfaceText } from './interfaceText';

export class CharacterBar {
  constructor({ rendererWidth }) {
    this._stage = new Container();

    this.characterRectangle = new RectangleBox({ x: 40, y: 6, width: rendererWidth / 2 - 50, height: 39 });
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
      text: 'LEVEL 1',
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
  }

  get stage() {
    return this._stage;
  }
}
