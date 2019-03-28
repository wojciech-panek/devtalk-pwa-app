import { Texture, Sprite } from 'pixi.js';


export class FoodItem {
  constructor({ type, x, y }) {
    this._texture = this.loadTexture(type);
    this._stage = new Sprite(this.texture);

    this.stage.height = 45;
    this.stage.width = 46;

    this.stage.x = x;
    this.stage.y = y;

    this.stage.interactive = true;
  }

  loadTexture = type => Texture.from(type);

  get stage() {
    return this._stage;
  }

  get texture() {
    return this._texture;
  }
}
