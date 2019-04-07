import { Container } from 'pixi.js';
import { CharacterBar } from './characterBar';
import { CoinsBar } from './coinsBar';
import { MenuBar } from './menuBar';

export class UserInterface {
  constructor({ rendererWidth }) {
    this._stage = new Container();

    this.stage.y = 10;

    this.characterBar = new CharacterBar({ rendererWidth: rendererWidth });
    this.coinsBar = new CoinsBar({ rendererWidth: rendererWidth });
    this.menuBar = new MenuBar({ rendererWidth });

    this.stage.addChild(this.characterBar.stage, this.coinsBar.stage, this.menuBar.stage);
  }

  get stage() {
    return this._stage;
  }
}
