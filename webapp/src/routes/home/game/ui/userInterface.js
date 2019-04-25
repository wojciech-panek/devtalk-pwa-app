import { Container } from 'pixi.js';
import { CharacterBar } from './characterBar';
import { CoinsBar } from './coinsBar';
import { MenuBar } from './menuBar';
import { Store } from './store';

export class UserInterface {
  constructor({ rendererWidth, rendererHeight, actions }) {
    this._stage = new Container();

    this.stage.y = 10;

    this.characterBar = new CharacterBar({ rendererWidth: rendererWidth });
    this.coinsBar = new CoinsBar({ rendererWidth: rendererWidth });

    this.store = new Store({
      actions: actions,
      rendererWidth: rendererWidth,
    });

    this.menuBar = new MenuBar({ rendererWidth: rendererWidth, rendererHeight: rendererHeight });

    this.stage.addChild(this.characterBar.stage, this.coinsBar.stage, this.store.stage, this.menuBar.stage);
  }

  get stage() {
    return this._stage;
  }
}
