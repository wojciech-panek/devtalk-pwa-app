import { Texture, Sprite } from 'pixi.js';
import background from '../../../../images/game/environment/warehouse.png';


export class Warehouse {
  constructor({ rendererWidth }) {
    this._texture = Texture.from(background);
    this._stage = new Sprite(this.texture);

    this.stage.width = 74;
    this.stage.height = 87;
    this.stage.anchor.set(0.5, 0.5);
    this.stage.x = rendererWidth / 2;
    this.stage.y = 110;

    this.stage.interactive = true;
  }

  get stage() {
    return this._stage;
  }

  get texture() {
    return this._texture;
  }
}
