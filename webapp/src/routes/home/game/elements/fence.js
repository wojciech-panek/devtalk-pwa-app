import { Texture, Sprite } from 'pixi.js';
import fence from '../../../../images/game/environment/fence.png';

export class Fence {
  constructor({ scale, column, position }) {
    this._texture = Texture.from(fence);
    this._stage = new Sprite(this.texture);

    this.stage.scale = ({ x: scale, y: scale });
    this.stage.anchor.set(0.5, 0.5);
    this.stage.x = position.x;
    this.stage.y = position.y;
    if (this.isEven(column)) {
      this.flipHorizontally(this.stage);
    }
  }

  isEven(numb) {
    return numb % 2;
  }

  flipHorizontally(sprite) {
    sprite.scale.x *= -1;
  }

  get stage() {
    return this._stage;
  }

  get texture() {
    return this._texture;
  }
}
