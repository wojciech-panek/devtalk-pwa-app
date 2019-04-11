import { Texture, Sprite } from 'pixi.js';
import { ANIMALS } from '../game.constants';


export class AnimalHead {
  constructor({ type, flip, onClick, interactive = true }) {
    this._type = type;
    this._onClick = onClick;
    this._stage = new Sprite();

    this.stage.height = 89;
    this.stage.width = 92;
    this.stage.x = flip ? 13 : -13;
    this.stage.anchor.set(0.5, 0.5);

    if (this.animal) {
      this._texture = this.loadTexture(this.animal.texture);
      this.stage.texture = this._texture;
    }

    if (flip) {
      this.flipHorizontally(this.stage);
    }

    if (interactive) {
      this.stage.interactive = true;
      this.stage.on('pointerdown', this.handlePointerDown.bind(this, flip));
    }
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

  set type(type) {
    this._type = type;

    if (this.animal) {
      this._texture = this.loadTexture(this.animal.texture);
      this.stage.texture = this._texture;
    }
  }
}
