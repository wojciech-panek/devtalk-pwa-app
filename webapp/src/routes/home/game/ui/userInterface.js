import { Container } from 'pixi.js';
import { CharacterBar } from './characterBar';
import { CoinsBar } from './coinsBar';

export class UserInterface {
  constructor({ rendererWidth }) {
    this._stage = new Container();

    this.stage.y = 10;

    this.characterBar = new CharacterBar({ rendererWidth: rendererWidth });
    this.coinsBar = new CoinsBar({ rendererWidth: rendererWidth });

    this.stage.addChild(this.characterBar.stage, this.coinsBar.stage);
  }

  get stage() {
    return this._stage;
  }
}
