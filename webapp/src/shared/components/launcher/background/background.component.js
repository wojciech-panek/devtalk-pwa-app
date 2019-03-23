import { Container, Sprite, Texture } from 'pixi.js';

class Background {
  constructor({ image }) {
    this._stage = new Container();
    this.texture = Texture.from(image);
    this.image = new Sprite(this.texture);
    this.image.width = 1;
    this.image.height = 1;
    this.stage.addChild(this.image);
  }

  get stage() {
    return this._stage;
  }
}

export default Background;
