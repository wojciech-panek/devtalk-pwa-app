import { Texture, Sprite } from 'pixi.js';


export class AnimalHead {
  constructor({ type }) {
    this._texture = this.loadTexture(type);
    this._stage = new Sprite(this.texture);

    this.stage.x = 10;
    this.stage.y = 170;

    this.stage.height = 80;
    this.stage.width = 80;
  }

  loadTexture = type => Texture.from(type);

  get stage() {
    return this._stage;
  }

  get texture() {
    return this._texture;
  }
}
