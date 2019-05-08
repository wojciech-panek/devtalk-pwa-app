import { Texture, Sprite } from 'pixi.js';
import emptyFoodFence from '../../../../images/game/food/food-frame.png';


export class FoodFence {
  constructor({ column, x, y }) {
    this._textureEmpty = Texture.from(emptyFoodFence);
    this._stage = new Sprite(this.textureEmpty);

    this.stage.height = 39;
    this.stage.width = 39;

    this.stage.x = x;
    this.stage.y = y;
    if (this.isEven(column)) {
      this.constructor.flipHorizontally(this.stage);
    }
  }

  isEven = num => num % 2 === 0;

  static flipHorizontally(sprite) {
    sprite.scale.x *= -1;
  }

  get stage() {
    return this._stage;
  }

  get textureEmpty() {
    return this._textureEmpty;
  }

  set x(value) {
    this.stage.x = value;
  }

  set y(value) {
    this.stage.y = value;
  }
}
