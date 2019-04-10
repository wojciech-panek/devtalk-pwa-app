import { Graphics, Container, Ticker } from 'pixi.js';

import { isoToTimestamp } from '../../../../shared/utils/date';


export class AnimalProgress {
  constructor({ flip, startProductionTimestamp, productionDuration, pokeCount }) {
    this._stage = new Container();
    this._backgroundCircle = new Graphics();
    this._innerCircle = new Graphics();
    this._ticker = new Ticker();

    this._startProductTimestamp = startProductionTimestamp;
    this._productionDuration = productionDuration;
    this._pokeCount = pokeCount;

    this.stage.x = flip ? 41 : -41;
    this.stage.y = 18;

    this.drawBackgroundCircle();
    this.drawInnerCircle();

    this._ticker.add(this.handleTick);
    this._ticker.start();

    this.stage.addChild(this._backgroundCircle, this._innerCircle);
  }

  drawBackgroundCircle = () => {
    this._backgroundCircle.lineStyle(1, 0x404040, 0.5);
    this._backgroundCircle.beginFill(0x404040, 1);
    this._backgroundCircle.drawCircle(0, 0, 9);
    this._backgroundCircle.endFill();
  };

  drawInnerCircle = () => {
    this._innerCircle.moveTo(0, 0);
    this._innerCircle.beginFill(0x45ee00, 1);
    this._innerCircle.lineStyle(0, 0x45ee00, 0.5);
    this._innerCircle.arc(0, 0, 7, 0, 2 * Math.PI * this.progress);
    this._innerCircle.endFill();
  };

  handleTick = () => {
    this._innerCircle.clear();
    this.drawInnerCircle();
  };

  get progress() {
    const now = Date.now();
    return Math.min(
      ((now - isoToTimestamp(this.startProductTimestamp)) + this.pokeCount * 1000) / (this.productionDuration * 1000),
      1,
    );
  }

  get stage() {
    return this._stage;
  }

  get startProductTimestamp() {
    return this._startProductTimestamp;
  }

  get productionDuration() {
    return this._productionDuration;
  }

  get pokeCount() {
    return this._pokeCount;
  }

  set startProductTimestamp(value) {
    this._startProductTimestamp = value;
  }

  set productionDuration(value) {
    this._productionDuration = value;
  }

  set pokeCount(value) {
    this._pokeCount = value;
  }
}
