import { Application } from 'pixi.js';
import { ifElse, equals } from 'ramda';

import { Background } from './elements/background';
import { Warehouse } from './elements/warehouse';
import { UserInterface } from './ui/userInterface';
import { FenceGroup } from './elements/fenceGroup';
import { FoodFenceGroup } from './elements/foodFenceGroup';
import { Animal } from './elements/animal';
import { Launcher } from '../../../shared/components/launcher';
import { GameState } from './game.state';


export class Game {
  constructor({ htmlElement, anonymousPlayer, actions }) {
    this._htmlElement = htmlElement;
    this._app = new Application({
      transparent: true,
      antialias: true,
      autoResize: true,
      resolution: window.devicePixelRatio,
      width: this.width,
      height: this.height,
    });
    this._actions = actions;

    this.htmlElement.append(this._app.renderer.view);
    this.launcher = new Launcher({
      loginViaGoogle: this.actions.loginViaGoogle,
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

    GameState.onReduxStateChange(this.handleReduxStateUpdate);
  }

  showLauncher() {
    this.stage.addChild(this.launcher.stage);
  }

  showGame() {
    const { fields = [] } = GameState.reduxState;

    this.background = new Background({ width: this.width, height: this.height });
    this.warehouse = new Warehouse({ rendererWidth: this.width });
    this.fenceGroup = new FenceGroup({ rendererWidth: this.width, rendererHeight: this.height });
    this.foodFenceGroup = new FoodFenceGroup({ rendererWidth: this.width, rendererHeight: this.height });
    this.userInterface = new UserInterface({ rendererWidth: this.width });

    this._animals = fields.filter((animal) => animal.amount).map(this.createAnimal);

    this.stage.interactive = true;
    this.stage.addChild(this.background.stage);
    this.stage.addChild(this.warehouse.stage);
    this.stage.addChild(this.fenceGroup.stage);
    this.stage.addChild(this.foodFenceGroup.stage);
    this.stage.addChild(this.userInterface.stage);
    this._animals.forEach((animal) => {
      this.stage.addChild(animal.stage);
    });
  }

  updateGame({ anonymousPlayer }) {
    if (!anonymousPlayer) {
      this.stage.removeChild(this.launcher.stage);
      this.showGame();
    }
  }

  handleReduxStateUpdate = () => {
    const { fields } = GameState.reduxState;
    const newAnimals = fields
      .filter((animal) => animal.amount)
      .filter((animal) => !this._animals.some((existingAnimal) => existingAnimal.positionNumber === animal.position))
      .map(this.createAnimal);
    const removedAnimals = this._animals
      .filter((existingAnimal) => existingAnimal.animalData.amount)
      .filter((existingAnimal) => !fields.some((animal) => existingAnimal.positionNumber === animal.position));

    this._animals = this._animals.concat(newAnimals);
    newAnimals.forEach((animal) => {
      this.stage.addChild(animal.stage);
    });

    this._animals = this._animals.filter((animal) => !removedAnimals.includes(animal));
    removedAnimals.forEach((animal) => {
      this.stage.removeChild(animal.stage);
    });
  };

  createAnimal = ({ position: positionNumber }) => new Animal({
    rendererWidth: this.width,
    rendererHeight: this.height,
    onSellFood: this.actions.sellFood,
    onPoke: this.actions.pokeAnimal,
    positionNumber,
  });

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
