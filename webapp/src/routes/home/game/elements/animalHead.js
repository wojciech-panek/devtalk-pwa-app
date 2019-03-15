import { Texture, Sprite } from 'pixi.js';


export class AnimalHead {
  constructor({ type, flip }) {
    this._texture = this.loadTexture(type);
    this._stage = new Sprite(this.texture);

    this.stage.height = 89;
    this.stage.width = 92;
    this.stage.anchor.set(0.5, 0.5);

    if (flip) {
      this.flipHorizontally(this.stage);
    }
    this.stage.interactive = true;
    this.stage.on('pointerdown', this.onClick.bind(this, flip));
  }

  loadTexture = type => Texture.from(type);

  flipHorizontally(sprite) {
    sprite.scale.x *= -1;
  }

  onClick = (flip) => {
    this.stage.scale.set(flip ? -0.35 : 0.35, 0.35);
    setTimeout(() => this.stage.scale.set(flip ? -0.33 : 0.33, 0.33), 200);
  };

  get stage() {
    return this._stage;
  }

  get texture() {
    return this._texture;
  }
}
