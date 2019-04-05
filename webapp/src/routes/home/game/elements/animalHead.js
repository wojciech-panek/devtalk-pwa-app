import { Texture, Sprite } from 'pixi.js';
import { ANIMALS } from '../game.constants';


export class AnimalHead {
  constructor({ type, flip, onClick }) {
    this._type = type;
    this._onClick = onClick;
    this._texture = this.loadTexture(this.animal.texture);
    this._stage = new Sprite(this.texture);

    this.stage.height = 89;
    this.stage.width = 92;
    this.stage.anchor.set(0.5, 0.5);

    if (flip) {
      this.flipHorizontally(this.stage);
    }
    this.stage.interactive = true;
    this.stage.on('pointerdown', this.handlePointerDown.bind(this, flip));
  }

  loadTexture = type => Texture.from(type);

  flipHorizontally(sprite) {
    sprite.scale.x *= -1;
  }

  handlePointerDown = (flip) => {
    this.stage.scale.set(flip ? -0.35 : 0.35, 0.35);
    setTimeout(() => this.stage.scale.set(flip ? -0.33 : 0.33, 0.33), 200);
    this._onClick();
  };

  get stage() {
    return this._stage;
  }

  get animal() {
    return ANIMALS[this._type];
  }

  get texture() {
    return this._texture;
  }
}
