import { Application } from 'pixi.js';
import { Background } from './elements/background';
import { Warehouse } from './elements/warehouse';
import { UserInterface } from './ui/userInterface';
import { FenceGroup } from './elements/fenceGroup';
import { Animal } from './elements/animal';
import { ANIMALS } from './game.constans';


export class Game {
  constructor({ htmlElement }) {
    this._htmlElement = htmlElement;
    this._app = new Application({
      transparent: true,
      antialias: true,
      autoResize: true,
      resolution: window.devicePixelRatio,
      width: this.width,
      height: this.height,
    });

    this.htmlElement.append(this._app.renderer.view);

    this.background = new Background({ width: this.width, height: this.height });
    this.warehouse = new Warehouse({ rendererWidth: this.width });
    this.fenceGroup = new FenceGroup({ rendererWidth: this.width, rendererHeight: this.height });
    this.userInterface = new UserInterface({ rendererWidth: this.width });
    this.chicken = new Animal({
      rendererWidth: this.width,
      rendererHeight: this.height,
      type: ANIMALS.chicken,
      positionNumber: 1,
      amount: 10,
      level: 10,
    });
    this.chick = new Animal({
      rendererWidth: this.width,
      rendererHeight: this.height,
      type: ANIMALS.chick,
      positionNumber: 2,
      amount: 2,
      level: 2,
    });

    this.stage.interactive = true;
    this.stage.addChild(this.background.stage);
    this.stage.addChild(this.warehouse.stage);
    this.stage.addChild(this.fenceGroup.stage);
    this.stage.addChild(this.userInterface.stage);
    this.stage.addChild(this.chicken.stage, this.chick.stage);
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

  get ticker() {
    return this._app.ticker;
  }
}
