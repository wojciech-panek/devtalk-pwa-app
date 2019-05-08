import { Texture, Sprite } from 'pixi.js';
import background from '../../../../images/game/environment/background.png';

export class Background {
  constructor({ containerSize }) {
    this._texture = Texture.from(background);
    this._stage = new Sprite(this.texture);
    this.containerSize = containerSize;
  }

  get stage() {
    return this._stage;
  }

  get texture() {
    return this._texture;
  }

  set containerSize(value) {
    this._containerSize = value;

    this.stage.width = this.containerSize.width;
    this.stage.height = this.containerSize.height;
  }

  get containerSize() {
    return this._containerSize;
  }
}
