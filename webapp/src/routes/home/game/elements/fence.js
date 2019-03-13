import { Texture, Sprite } from 'pixi.js';
import fence from '../../../../images/game/environment/fence.png';
import emptyFence from '../../../../images/game/environment/empty-fence.png';


export class Fence {
  constructor({ column, position }) {
    this._textureEmpty = Texture.from(emptyFence);
    this._textureFull = Texture.from(fence);
    this._stage = new Sprite(this.textureEmpty);

    this.stage.height = 89;
    this.stage.width = 92;
    this.stage.anchor.set(0.5, 0.5);
    this.stage.x = position.x;
    this.stage.y = position.y;
    if (this.isEven(column)) {
      this.flipHorizontally(this.stage);
    }

    this.stage.interactive = true;
    this.stage.on('pointerdown', this.onClick);
  }

  onClick = () => {
    this.stage.texture = this.textureFull;
  };

  isEven = num => num % 2;

  flipHorizontally(sprite) {
    sprite.scale.x *= -1;
  }

  get stage() {
    return this._stage;
  }

  get textureEmpty() {
    return this._textureEmpty;
  }

  get textureFull() {
    return this._textureFull;
  }
}
