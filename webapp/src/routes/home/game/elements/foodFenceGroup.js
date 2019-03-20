import { Container } from 'pixi.js';
import { FENCES_COLUMNS, FENCES_ROWS, FENCES_INITIAL_Y } from '../game.constans';
import { FoodFence } from './foodFence';

export class FoodFenceGroup {
  constructor({ rendererWidth, rendererHeight }) {
    this._stage = new Container();

    this.renderFences(rendererWidth, rendererHeight);
  }

  renderFences = (rendererWidth, rendererHeight) => {
    const firstColumnXPos = 130;
    const secondColumnXPos = rendererWidth - 130;
    const additionalOffset = 10;

    for (let i = 0; i < FENCES_ROWS; i++) {
      const yOffset = i * ((rendererHeight - FENCES_INITIAL_Y) / FENCES_ROWS + additionalOffset);

      for (let j = 0; j < FENCES_COLUMNS; j++) {
        const x = j ? secondColumnXPos : firstColumnXPos;
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
