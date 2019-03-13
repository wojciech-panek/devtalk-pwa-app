import { Texture, Sprite } from 'pixi.js';
import coin from '../../../../images/game/environment/coin.png';


export class Coin {
  constructor({ x, y, width, height }) {
    this._texture = Texture.from(coin);
    this._stage = new Sprite(this.texture);

    this.stage.width = width;
    this.stage.height = height;
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



