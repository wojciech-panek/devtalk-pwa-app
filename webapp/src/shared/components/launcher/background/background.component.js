import { Container, Sprite, Texture } from 'pixi.js';

class Background extends Container {
  constructor({ image }) {
    super();
    this.texture = Texture.from(image);
    this.image = new Sprite(this.texture);
    this.image.width = 1;
    this.image.height = 1;
    this.addChild(this.image);
  }
}

export default Background;
