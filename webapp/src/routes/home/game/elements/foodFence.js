import { Texture, Sprite } from 'pixi.js';
import emptyFoodFence from '../../../../images/game/food/food-frame.png';


export class FoodFence {
  constructor({ column, position }) {
    this._textureEmpty = Texture.from(emptyFoodFence);
    this._stage = new Sprite(this.textureEmpty);

    this.stage.height = 39;
    this.stage.width = 39;

    this.stage.x = position.x;
    this.stage.y = position.y;
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
}
