import { Container } from 'pixi.js';
import { RectangleBox } from '../ui/rectangleBox';
import { InterfaceText } from '../ui/interfaceText';

export class AnimalButton {
  constructor({ flip, text, backgroundColor, visible, onClick }) {
    this._stage = new Container();
    this._stage.x = flip ? -32 : -48;
    this._stage.y = 30;
    this._stage.width = 80;
    this._stage.height = 25;
    this._stage.visible = visible;

    this.rectangleBox = new RectangleBox({
      x: 0,
      y: 0,
      width: 80,
      height: 25,
      radius: 1.2,
      color: backgroundColor,
    });

    this.text = new InterfaceText({
      text: text,
      anchorX: 0.5,
      anchorY: 0.5,
      x: 40,
      y: 12.5,
      font: 'Arial Black',
      fontSize: 10,
      fontWeight: 'bold',
      fillColor: '0xFFFFFF',
    });

    this.stage.addChild(this.rectangleBox.stage, this.text.stage);

    this._stage.interactive = true;
    this._stage.on('pointerdown', onClick);
  }

  get stage() {
    return this._stage;
  }

  set visible(value) {
    this._stage.visible = value;
  }
}
