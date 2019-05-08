import { Container } from 'pixi.js';
import { CharacterBar } from './characterBar';
import { CoinsBar } from './coinsBar';
import { MenuBar } from './menuBar';
import { Store } from './store';

export class UserInterface {
  constructor({ containerSize, actions }) {
    this._stage = new Container();

    this.stage.y = 10;

    this.characterBar = new CharacterBar({ containerSize });
    this.coinsBar = new CoinsBar({ containerSize });

    this.store = new Store({ actions: actions, containerSize });

    this.menuBar = new MenuBar({ containerSize });

    this.stage.addChild(this.characterBar.stage, this.coinsBar.stage, this.store.stage, this.menuBar.stage);
  }

  get stage() {
    return this._stage;
  }

  set containerSize(value) {
    this.characterBar.containerSize = value;
    this.coinsBar.containerSize = value;
    this.menuBar.containerSize = value;
    this.store.containerSize = value;
  }
}
