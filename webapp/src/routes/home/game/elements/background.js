import { Texture, Sprite } from 'pixi.js';
import background from '../../../../images/game/background.png';

export class Background {
  constructor({ width, height }) {
    this._texture = Texture.from(background);
    this._stage = new Sprite(this.texture);

    this.stage.width = width;
    this.stage.height = height;
  }

  get stage() {
    return this._stage;
  }

  get texture() {
    return this._texture;
  }
}
