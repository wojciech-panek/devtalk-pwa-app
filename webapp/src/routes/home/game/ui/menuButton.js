import { Container } from 'pixi.js';
import { RectangleMenuBox } from './rectangleMenuBox';
import { MenuIcon } from './menuIcon';

export class MenuButton {
  constructor({ x, y, width, height, type }) {
    this._stage = new Container();

    this.button = new RectangleMenuBox({
      x: x,
      y: y,
      width: width,
      height: height,
    });

    this.icon = new MenuIcon({
      x: x + width / 2,
      y: y + 15,
      width: 30,
      height: 30,
      type: type,
    });

    this.stage.addChild(this.button.stage, this.icon.stage);
  }

  get stage() {
    return this._stage;
  }
}
