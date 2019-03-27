import { Container } from 'pixi.js';
import { CharacterBar } from './characterBar';
import { CoinsBar } from './coinsBar';

export class UserInterface {
  constructor({ rendererWidth, state }) {
    this._stage = new Container();

    this.stage.y = 10;

    this.characterBar = new CharacterBar({ rendererWidth: rendererWidth, level: state.level });
    this.coinsBar = new CoinsBar({ rendererWidth: rendererWidth, coins: state.coins });

    this.stage.addChild(this.characterBar.stage, this.coinsBar.stage);
  }

  get stage() {
    return this._stage;
  }
}
