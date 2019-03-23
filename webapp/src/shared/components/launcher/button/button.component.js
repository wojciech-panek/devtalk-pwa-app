import { Text, Sprite, Texture, Container } from 'pixi.js';

import button from '../../../../images/game/ui/button.png';


class Button {
  constructor({ text, onClick }) {
    this._stage = new Container();
    this.stage.interactive = true;
    this.stage.buttonMode = true;
    this.stage.on('pointerdown', onClick);

    this.buttonTexture = Texture.from(button);
    this.box = new Sprite(this.buttonTexture);
    this.box.anchor.set(0.5);
    this.boxSetup();

    this.text = new Text(text, {
      fontSize: 18,
      fill: 0xffffff,
    });
    this.text.anchor.set(0.5);

    this.stage.addChild(this.box, this.text);
  }

  boxSetup() {
    this.getImageSizes(button);
  }

  getImageSizes(image) {
    const img = new Image();
    const self = this;
    img.onload = function () {
      self.box.width = this.width;
      self.box.height = this.height;
    };
    img.src = image;
  }

  get stage() {
    return this._stage;
  }
}

export default Button;
