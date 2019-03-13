import { Application } from 'pixi.js';
import { Background } from './elements/background';
import { Warehouse } from './elements/warehouse';
import { Fence } from './elements/fence';

const FENCES_COLUMNS = 2;
const FENCES_ROWS = 4;

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
    this.warehouse = new Warehouse({ rendererWidth: this.width, rendererHeight: this.height, scale: 1 / 3 });

    this.stage.addChild(this.background.stage);
    this.stage.addChild(this.warehouse.stage);

    this.displayFences().map(el => this.stage.addChild(el.stage));
  }

  displayFences() {
    const firstColumnXPos = 100;
    const secondColumnXPos = this.width - 100;
    const initialYPos = 250;
    let increaseYValue = 0;
    let fenceArray = [];

    for (let i = 0; i < FENCES_ROWS; i++) {
      for (let j = 0; j < FENCES_COLUMNS; j++) {
        fenceArray.push(
          new Fence({
            scale: 1 / 3,
            column: j,
            position: { x: j ? secondColumnXPos : firstColumnXPos, y: initialYPos + increaseYValue },
          }));
      }
      increaseYValue += (this.height - initialYPos) / FENCES_ROWS + 10;
    }

    return fenceArray;
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
