import { Application } from 'pixi.js';
import { ifElse, equals } from 'ramda';

import { Background } from './elements/background';
import { Warehouse } from './elements/warehouse';
import { UserInterface } from './ui/userInterface';
import { FenceGroup } from './elements/fenceGroup';
import { FoodFenceGroup } from './elements/foodFenceGroup';
import { Animal } from './elements/animal';
import { Launcher } from '../../../shared/components/launcher';


export class Game {
  constructor({ htmlElement, anonymousPlayer, loginViaGoogle, callPwaPrompt, state }) {
    this._htmlElement = htmlElement;
    this._app = new Application({
      transparent: true,
      antialias: true,
      autoResize: true,
      resolution: window.devicePixelRatio,
      width: this.width,
      height: this.height,
    });
    this._loginViaGoogle = loginViaGoogle;
    this._callPwaPrompt = callPwaPrompt;
    this._state = state;

    this.htmlElement.append(this._app.renderer.view);
    this.launcher = new Launcher({
      loginViaGoogle: this.loginViaGoogle,
      callPwaPrompt: this.callPwaPrompt,
      containerSize: {
        width: this.width,
        height: this.height,
      },
    });

    ifElse(
      equals(true),
      () => this.showLauncher(),
      () => this.showGame()
    )(anonymousPlayer);
  }

  showLauncher() {
    this.stage.addChild(this.launcher.stage);
  }

  showGame() {
    this.background = new Background({ width: this.width, height: this.height });
    this.warehouse = new Warehouse({ rendererWidth: this.width });
    this.fenceGroup = new FenceGroup({ rendererWidth: this.width, rendererHeight: this.height });
    this.foodFenceGroup = new FoodFenceGroup({ rendererWidth: this.width, rendererHeight: this.height });
    this.userInterface = new UserInterface({ rendererWidth: this.width, state: this.state });

    const animals = this.state.fields.map(({ position: positionNumber, ...other }) => new Animal({
      rendererWidth: this.width,
      rendererHeight: this.height,
      positionNumber,
      ...other,
    }));

    this.stage.interactive = true;
    this.stage.addChild(this.background.stage);
    this.stage.addChild(this.warehouse.stage);
    this.stage.addChild(this.fenceGroup.stage);
    this.stage.addChild(this.foodFenceGroup.stage);
    this.stage.addChild(this.userInterface.stage);
    animals.forEach((field) => {
      this.stage.addChild(field.stage);
    });
  }

  updateGame({ anonymousPlayer, state }) {
    this.state = state;

    if (!anonymousPlayer) {
      this.stage.removeChild(this.launcher.stage);
      this.showGame();
    }
  }

  get htmlElement() {
    return this._htmlElement;
  }

  get width() {
    return this._htmlElement.offsetWidth;
  }

  get height() {
    return this._htmlElement.offsetHeight;
  }

  get stage() {
    return this._app.stage;
  }

  get loginViaGoogle() {
    return this._loginViaGoogle;
  }

  get callPwaPrompt() {
    return this._callPwaPrompt;
  }

  set state(value) {
    this._state = value;
  }

  get state() {
    return this._state;
  }

  get ticker() {
    return this._app.ticker;
  }
}
