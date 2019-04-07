import { Texture } from 'pixi.js';

export class MenuButton {
  constructor({ x, y, width, height, type }) {
    this._texture = this.loadTexture(type);

    this.stage.width = width;
    this.stage.height = height;
    this.stage.x = x;
    this.stage.y = y;
  }

  loadTexture = type => Texture.from(type);

  get stage() {
    return this._stage;
  }

  get texture() {
    return this._texture;
  }
}
