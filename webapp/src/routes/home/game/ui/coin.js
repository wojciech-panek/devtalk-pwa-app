import { Texture, AnimatedSprite } from 'pixi.js';
import { times } from 'ramda';

import coin1 from '../../../../images/game/environment/sprites/coin/coin-sprite-1.png';
import coin2 from '../../../../images/game/environment/sprites/coin/coin-sprite-2.png';
import coin3 from '../../../../images/game/environment/sprites/coin/coin-sprite-3.png';
import coin4 from '../../../../images/game/environment/sprites/coin/coin-sprite-4.png';

const delayFrames = times(() => coin1, 20);

export class Coin {
  constructor({ x, y, width, height }) {
    this._texture = this.loadTextures();
    this._stage = new AnimatedSprite(this.texture);

    this.stage.width = width;
    this.stage.height = height;
    this.stage.x = x;
    this.stage.y = y;
    this.stage.animationSpeed = 0.2;
    this.stage.play();
  }

  loadTextures = () => [...delayFrames, coin2, coin3, coin4, coin1]
    .map(texture => Texture.from(texture));

  get stage() {
    return this._stage;
  }

  get texture() {
    return this._texture;
  }
}
