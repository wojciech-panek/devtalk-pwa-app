import { Container } from 'pixi.js';

import { FENCES_INITIAL_Y, FENCES_ROWS, ANIMALS } from '../game.constans';
import { AnimalLevel } from './animalLevel';
import { AnimalHead } from './animalHead';
import { InterfaceText } from '../ui/interfaceText';
import buffalo from '../../../../images/game/animals/animal-buffalo.png';
import chicken from '../../../../images/game/animals/animal-chicken.png';
import chick from '../../../../images/game/animals/animal-chick.png';
import cow from '../../../../images/game/animals/animal-cow.png';
import duck from '../../../../images/game/animals/animal-duck.png';
import goat from '../../../../images/game/animals/animal-goat.png';
import moose from '../../../../images/game/animals/animal-moose.png';
import pig from '../../../../images/game/animals/animal-pig.png';


const textures = {
  [ANIMALS.buffalo]: buffalo,
  [ANIMALS.chicken]: chicken,
  [ANIMALS.chick]: chick,
  [ANIMALS.cow]: cow,
  [ANIMALS.duck]: duck,
  [ANIMALS.goat]: goat,
  [ANIMALS.moose]: moose,
  [ANIMALS.pig]: pig,
};

export class Animal {
  constructor({ rendererWidth, rendererHeight, type, positionNumber, amount, level }) {
    this._stage = new Container();
    this._positionNum = this.getPositionNumber(positionNumber);

    this.stage.height = 89;
    this.stage.width = 92;

    this.calculatePosition(rendererWidth, rendererHeight, this.positionNum);

    this.amount = new InterfaceText({
      text: `${amount}`,
      anchorX: 0.5,
      anchorY: 0.5,
      x: this.isEven(positionNumber) ? -25 : 25,
      y: 0,
      font: 'Arial Black',
      fontSize: 12,
      fontWeight: 'normal',
      fillColor: '0xFFFFFF',
    });

    this.level = new AnimalLevel({ level: level, flip: !this.isEven(positionNumber) });
    this.animalHead = new AnimalHead({ type: textures[type], flip: !this.isEven(positionNumber) });
    this.stage.addChild(this.level.stage, this.amount.stage, this.animalHead.stage);
  }

  getPositionNumber = positionNumber => {
    if (positionNumber < 1) {
      return 1;
    }
    if (positionNumber > 8) {
      return 8;
    }
    return positionNumber;
  };

  isEven = num => num % 2;

  calculateRow = positionNumber => Math.floor((positionNumber + (positionNumber - 1)) / FENCES_ROWS);

  calculatePosition = (rendererWidth, rendererHeight, positionNumber) => {
    const firstColumnXPos = 90;
    const secondColumnXPos = rendererWidth - 90;
    const additionalOffset = 10;

    this.stage.x = this.isEven(positionNumber) ? firstColumnXPos : secondColumnXPos;

    const yOffset =
      this.calculateRow(positionNumber) * ((rendererHeight - FENCES_INITIAL_Y) / FENCES_ROWS + additionalOffset);

    this.stage.y = FENCES_INITIAL_Y + yOffset;
  };

  get stage() {
    return this._stage;
  }

  get positionNum() {
    return this._positionNum;
  }
}
