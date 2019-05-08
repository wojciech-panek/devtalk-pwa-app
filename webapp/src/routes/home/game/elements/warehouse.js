import { Texture, Sprite } from 'pixi.js';
import background from '../../../../images/game/environment/warehouse.png';


export class Warehouse {
  constructor({ containerSize }) {
    this._texture = Texture.from(background);
    this._stage = new Sprite(this.texture);
    this._containerSize = containerSize;

    this.stage.width = 74;
    this.stage.height = 87;
    this.stage.anchor.set(0.5, 0.5);
    this.stage.x = this.containerSize.width / 2;
    this.stage.y = 110;

    this.stage.interactive = true;
  }

  get stage() {
    return this._stage;
  }

  get texture() {
    return this._texture;
  }

  set containerSize(value) {
    this._containerSize = value;

    this.stage.x = this.containerSize.width / 2;
  }

  get containerSize() {
    return this._containerSize;
  }
}
