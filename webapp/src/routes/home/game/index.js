import { Application, Container } from 'pixi.js';

import { Background } from './elements/background';
import { Warehouse } from './elements/warehouse';
import { UserInterface } from './ui/userInterface';
import { FenceGroup } from './elements/fenceGroup';
import { FoodFenceGroup } from './elements/foodFenceGroup';
import { Animal } from './elements/animal';
import { Launcher } from './ui/launcher';
import { GameState, states } from './game.state';


export class Game {
  constructor({ htmlElement, actions }) {
    this._htmlElement = htmlElement;
    this._app = new Application({
      transparent: true,
      antialias: true,
      autoResize: true,
      resolution: window.devicePixelRatio,
      width: this.width,
      height: this.height,
    });
    this._app.renderer.plugins.accessibility.destroy();
    this._actions = actions;

    this.htmlElement.append(this._app.renderer.view);

    this.launcher = new Launcher({
      visible: this.isLauncherVisible,
      containerSize: {
        width: this.width,
        height: this.height,
      },
    });

    this._content = new Container();
    this._content.visible = this.isGameVisible;
    this._gameInitialized = false;

    this.stage.addChild(this.launcher.stage);
    this.stage.addChild(this._content);

    GameState.onStateChange(this.handleStateUpdate);
    GameState.onReduxStateChange(this.handleReduxStateUpdate);

    if (this.isGameVisible) {
      this.createGame();
    }

    window.addEventListener('resize', this.handleResize);
  }

  createGame() {
    const { fields = [] } = GameState.reduxState;
    const containerSize = { width: this.width, height: this.height };

    this.background = new Background({ containerSize });
    this.warehouse = new Warehouse({ containerSize });
    this.fenceGroup = new FenceGroup({ containerSize });
    this.foodFenceGroup = new FoodFenceGroup({ containerSize });
    this.userInterface = new UserInterface({ containerSize, actions: this.actions });

    this._animals = fields.map(this.createAnimal);

    this._content.interactive = true;
    this._content.addChild(this.background.stage);
    this._content.addChild(this.warehouse.stage);
    this._content.addChild(this.fenceGroup.stage);
    this._content.addChild(this.foodFenceGroup.stage);
    this._animals.forEach((animal) => {
      this._content.addChild(animal.stage);
    });
    this._content.addChild(this.userInterface.stage);

    this._gameInitialized = true;
  }

  createAnimal = ({ position: positionNumber }) => new Animal({
    containerSize: { width: this.width, height: this.height },
    onSellFood: this.actions.sellFood,
    onPoke: this.actions.pokeAnimal,
    positionNumber,
  });

  handleResize = () => {
    this._app.renderer.resize(window.innerWidth, window.innerHeight);
    const containerSize = { width: this.width, height: this.height };

    this.launcher.containerSize = containerSize;

    if (this._gameInitialized) {
      this.background.containerSize = containerSize;
      this.warehouse.containerSize = containerSize;
      this.fenceGroup.containerSize = containerSize;
      this.foodFenceGroup.containerSize = containerSize;
      this.userInterface.containerSize = containerSize;

      this._animals.forEach((animal) => {
        animal.containerSize = containerSize;
      });
    }
  };

  handleStateUpdate = () => {
    this.launcher.visible = this.isLauncherVisible;
    this._content.visible = this.isGameVisible;

    if (this.isGameVisible && !this._gameInitialized && GameState.reduxState.fields) {
      this.createGame();
    }
  };

  handleReduxStateUpdate = () => {
    if (this.isGameVisible && !this._gameInitialized && GameState.reduxState.fields) {
      this.createGame();
    }
  };

  get isLauncherVisible() {
    return GameState.state === states.NOT_LOGGED_IN || GameState.state === states.TO_BIG;
  }

  get isGameVisible() {
    return GameState.state !== states.NOT_LOGGED_IN && GameState.state !== states.TO_BIG;
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

  get actions() {
    return this._actions;
  }

  get ticker() {
    return this._app.ticker;
  }
}
