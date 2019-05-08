import { Texture, Sprite } from 'pixi.js';
import fence from '../../../../images/game/environment/fence.png';
import emptyFence from '../../../../images/game/environment/empty-fence.png';
import { GameState } from '../game.state';


export class Fence {
  constructor({ column, x, y, positionNumber }) {
    this._positionNumber = positionNumber;
    this._textureEmpty = Texture.from(emptyFence);
    this._textureFull = Texture.from(fence);
    this._stage = new Sprite(this.texture);

    this.stage.height = 89;
    this.stage.width = 92;
    this.stage.anchor.set(0.5, 0.5);
    this.stage.x = x;
    this.stage.y = y;
    if (this.isEven(column)) {
      this.flipHorizontally(this.stage);
    }

    GameState.onReduxStateChange(this.handleReduxStateUpdate);
  }

  handleReduxStateUpdate = () => {
    this.stage.texture = this.texture;
  };

  isEven = num => num % 2;

  flipHorizontally(sprite) {
    sprite.scale.x *= -1;
  }

  get texture() {
    if (!this.animalData) {
      return null;
    }
    return this.animalData.amount > 0 ? this.textureFull : this.textureEmpty;
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

  get fieldIndex() {
    if (!GameState.reduxState.fields) {
      return -1;
    }
    return GameState.reduxState.fields.findIndex((field) => field.position === this.positionNumber);
  }

  get positionNumber() {
    return this._positionNumber;
  }

  get animalData() {
    if (this.fieldIndex === -1) {
      return null;
    }
    return GameState.reduxState.fields[this.fieldIndex];
  }

  set x(value) {
    this.stage.x = value;
  }

  set y(value) {
    this.stage.y = value;
  }
}
