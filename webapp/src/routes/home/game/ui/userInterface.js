import { Container } from 'pixi.js';
import { CharacterBar } from './characterBar';
import { CoinsBar } from './coinsBar';
import { MenuBar } from './menuBar';
import { Store } from './store';

export class UserInterface {
  constructor({ rendererWidth, rendererHeight }) {
    this._stage = new Container();

    this.stage.y = 10;

    this.characterBar = new CharacterBar({ rendererWidth: rendererWidth });
    this.coinsBar = new CoinsBar({ rendererWidth: rendererWidth });

    this.store = new Store({
      x: rendererWidth * 0.05,
      y: rendererHeight * 0.205,
      width: rendererWidth * 0.9,
      height: rendererHeight * 0.33,
    });

    this.menuBar = new MenuBar({ rendererWidth: rendererWidth, rendererHeight: rendererHeight });

    this.stage.addChild(this.characterBar.stage, this.coinsBar.stage, this.store.stage, this.menuBar.stage);
  }

  get stage() {
    return this._stage;
  }
}
