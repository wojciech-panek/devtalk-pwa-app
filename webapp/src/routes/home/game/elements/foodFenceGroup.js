import { Container } from 'pixi.js';
import { FENCES_COLUMNS, FENCES_ROWS, FENCES_INITIAL_Y, FENCES_BOTTOM_MARGIN } from '../game.constants';
import { FoodFence } from './foodFence';

export class FoodFenceGroup {
  constructor({ rendererWidth, rendererHeight }) {
    this._stage = new Container();

    this.firstColumnXPos = 170;
    this.secondColumnXPos = rendererWidth - 170;
    this.additionalOffset = 10;

    this.renderFences(rendererWidth, rendererHeight);
  }

  renderFences = (rendererWidth, rendererHeight) => {
    for (let i = 0; i < FENCES_ROWS; i++) {
      const yOffset = i *
        ((rendererHeight - FENCES_BOTTOM_MARGIN - FENCES_INITIAL_Y) / FENCES_ROWS + this.additionalOffset);

      for (let j = 0; j < FENCES_COLUMNS; j++) {
        const x = j ? this.secondColumnXPos : this.firstColumnXPos;
        const y = FENCES_INITIAL_Y + yOffset - 19;
        const foodFence = new FoodFence({
          column: j,
          position: { x: x, y: y },
        });
        this.stage.addChild(foodFence.stage);
      }
    }
  };

  get stage() {
    return this._stage;
  }
}
