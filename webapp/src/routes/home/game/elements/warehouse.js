import { Texture, Sprite } from 'pixi.js';
import background from '../../../../images/game/environment/warehouse.png';
import { GameState, states } from '../game.state';

export class Warehouse {
  constructor({ rendererWidth }) {
    this._texture = Texture.from(background);
    this._stage = new Sprite(this.texture);

    this.stage.width = 74;
    this.stage.height = 87;
    this.stage.anchor.set(0.5, 0.5);
    this.stage.x = rendererWidth / 2;
    this.stage.y = 130;

    this.stage.interactive = true;
    this.stage.on('pointerdown', this.handlePointerDown);
    GameState.onUpgradingStateEnter(this.handleUpgradingStateEnter);
  }

  handlePointerDown = () => {
    GameState.changeState(states.UPGRADING);
  };

  handleUpgradingStateEnter = () => {
    console.log('open modal');
  };


  get stage() {
    return this._stage;
  }

  get texture() {
    return this._texture;
  }
}
