import { Container } from 'pixi.js';
import { FENCES_COLUMNS, FENCES_ROWS, FENCES_INITIAL_Y } from '../game.constans';
import { Fence } from './fence';


export class FenceGroup {
  constructor({ rendererWidth, rendererHeight }) {
    this._stage = new Container();

    this.renderFences(rendererWidth, rendererHeight);
  }

  renderFences = (rendererWidth, rendererHeight) => {
    const firstColumnXPos = 90;
    const secondColumnXPos = rendererWidth - 90;
    const additionalOffset = 10;

    for (let i = 0; i < FENCES_ROWS; i++) {
      const yOffset = i * ((rendererHeight - FENCES_INITIAL_Y) / FENCES_ROWS + additionalOffset);

      for (let j = 0; j < FENCES_COLUMNS; j++) {
        const x = j ? secondColumnXPos : firstColumnXPos;
        const y = FENCES_INITIAL_Y + yOffset;
        const fence = new Fence({
          column: j,
          position: { x: x, y: y },
        });
        this.stage.addChild(fence.stage);
      }
    }
  };

  get stage() {
    return this._stage;
  }
}
