import { Texture, Sprite } from 'pixi.js';

import { FOOD } from '../game.constants';


export class FoodItem {
  constructor({ onClick, type, x, y }) {
    this._type = type;
    this._stage = new Sprite();

    if (this.food) {
      this._texture = this.loadTexture(this.food.texture);
      this.stage.texture = this._texture;
    }

    this.stage.height = 45;
    this.stage.width = 46;

    this.stage.x = x;
    this.stage.y = y;

    this.stage.interactive = true;
    this.stage.on('pointerdown', onClick);
  }

  loadTexture = type => Texture.from(type);

  get stage() {
    return this._stage;
  }

  get food() {
    return FOOD[this._type];
  }

  get type() {
    return this._type;
  }

  get texture() {
    return this._texture;
  }
}
