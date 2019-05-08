import { Container } from 'pixi.js';
import { FENCES_COLUMNS, FENCES_ROWS, FENCES_INITIAL_Y, FENCES_BOTTOM_MARGIN } from '../game.constants';
import { Fence } from './fence';


export class FenceGroup {
  constructor({ containerSize }) {
    this._stage = new Container();
    this._containerSize = containerSize;
    this._fences = [];

    this._firstColumnXPos = 90;
    this._additionalOffset = 10;

    this.createFences();
  }

  createFences = () => {
    const { height } = this.containerSize;

    for (let i = 0; i < FENCES_ROWS; i++) {
      const yOffset = i * ((height - FENCES_BOTTOM_MARGIN - FENCES_INITIAL_Y) / FENCES_ROWS + this._additionalOffset);

      for (let j = 0; j < FENCES_COLUMNS; j++) {
        const x = j ? this.secondColumnXPos : this._firstColumnXPos;
        const y = FENCES_INITIAL_Y + yOffset;
        const fence = new Fence({
          column: j,
          x,
          y,
          positionNumber: i * FENCES_COLUMNS + j + 1,
        });
        this._fences.push(fence);
        this.stage.addChild(fence.stage);
      }
    }
  };

  repositionFences = () => {
    const { height } = this.containerSize;

    for (let i = 0; i < FENCES_ROWS; i++) {
      const yOffset = i * ((height - FENCES_BOTTOM_MARGIN - FENCES_INITIAL_Y) / FENCES_ROWS + this._additionalOffset);

      for (let j = 0; j < FENCES_COLUMNS; j++) {
        const fence = this._fences[i * FENCES_COLUMNS + j];
        fence.x = j ? this.secondColumnXPos : this._firstColumnXPos;
        fence.y = FENCES_INITIAL_Y + yOffset;
      }
    }
  };

  get stage() {
    return this._stage;
  }

  get secondColumnXPos() {
    return this.containerSize.width - this._firstColumnXPos;
  }

  set containerSize(value) {
    this._containerSize = value;

    this.repositionFences();
  }

  get containerSize() {
    return this._containerSize;
  }
}
