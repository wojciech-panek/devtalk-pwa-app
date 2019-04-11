import { Texture, AnimatedSprite } from 'pixi.js';
import { times } from 'ramda';

import character1 from '../../../../images/game/environment/sprites/character/character-sprite-1.png';
import character2 from '../../../../images/game/environment/sprites/character/character-sprite-2.png';
import character3 from '../../../../images/game/environment/sprites/character/character-sprite-3.png';

const delayFrames = times(() => character1, 5);

export class Character {
  constructor({ x, y }) {
    this._texture = this.loadTextures();
    this._stage = new AnimatedSprite(this.texture);

    this.stage.width = 63;
    this.stage.height = 49;
    this.stage.x = x;
    this.stage.y = y;
    this.stage.animationSpeed = 0.01;
    this.stage.play();
  }

  loadTextures = () => [
    ...delayFrames,
    character3,
    character2,
    character3,
    character1,
    character1,
    character3,
    character2,
    character2,
    character2,
    character3,
  ].map(texture => Texture.from(texture));

  get stage() {
    return this._stage;
  }

  get texture() {
    return this._texture;
  }
}
