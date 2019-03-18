import { Graphics } from 'pixi.js';
import { InterfaceText } from '../ui/interfaceText';


export class AnimalLevel {
  constructor({ level, flip }) {
    this._stage = new Graphics();

    this.stage.x = flip ? 42 : -42;
    this.stage.y = -40;

    this.drawCircle();

    this.levelNumber = new InterfaceText({
      text: `${level}`,
      anchorX: 0.5,
      anchorY: 0.5,
      x: 0,
      y: 0,
      fontSize: 11,
      fontWeight: 'bold',
      fillColor: '0x6B4B3A',
    });

    this.stage.addChild(this.levelNumber.stage);
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

  get stage() {
    return this._stage;
  }
}
