import { Container } from 'pixi.js';
import { FENCES_COLUMNS, FENCES_ROWS, FENCES_INITIAL_Y, FENCES_BOTTOM_MARGIN } from '../game.constants';
import { FoodFence } from './foodFence';

export class FoodFenceGroup {
  constructor({ containerSize }) {
    this._stage = new Container();
    this._containerSize = containerSize;
    this._foodFences = [];

    this._firstColumnXPos = 170;
    this._additionalOffset = 10;

    this.createFences();
  }

  createFences = () => {
    const { height } = this.containerSize;

    for (let i = 0; i < FENCES_ROWS; i++) {
      const yOffset = i *
        ((height - FENCES_BOTTOM_MARGIN - FENCES_INITIAL_Y) / FENCES_ROWS + this._additionalOffset);

      for (let j = 0; j < FENCES_COLUMNS; j++) {
        const x = j ? this.secondColumnXPos : this._firstColumnXPos;
        const y = FENCES_INITIAL_Y + yOffset - 19;
        const foodFence = new FoodFence({
          column: j,
          x: x,
          y: y,
        });
        this._foodFences.push(foodFence);
        this.stage.addChild(foodFence.stage);
      }
    }
  };

  repositionFences = () => {
    const { height } = this.containerSize;

    for (let i = 0; i < FENCES_ROWS; i++) {
      const yOffset = i *
        ((height - FENCES_BOTTOM_MARGIN - FENCES_INITIAL_Y) / FENCES_ROWS + this._additionalOffset);

      for (let j = 0; j < FENCES_COLUMNS; j++) {
        const foodFence = this._foodFences[i * FENCES_COLUMNS + j];
        foodFence.x = j ? this.secondColumnXPos : this._firstColumnXPos;
        foodFence.y = FENCES_INITIAL_Y + yOffset - 19;
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
