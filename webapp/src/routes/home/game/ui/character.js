import { Texture, Sprite } from 'pixi.js';
import character from '../../../../images/game/environment/character.png';

export class Character {
  constructor({ x, y }) {
    this._texture = Texture.from(character);
    this._stage = new Sprite(this.texture);

    this.stage.width = 63;
    this.stage.height = 49;
    this.stage.x = x;
    this.stage.y = y;
  }

  get stage() {
    return this._stage;
  }

  get texture() {
    return this._texture;
  }
}
