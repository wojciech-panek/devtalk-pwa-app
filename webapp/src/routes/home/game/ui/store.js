import { Container } from 'pixi.js';
import { StoreBox } from './storeBox';
import { InterfaceText } from './interfaceText';
import { AnimalHead } from './animalHead';
import { StoreBar } from './storeBar';
import { CloseButton } from './closeButton';

import { ANIMALS } from '../game.constants';

import buffalo from '../../../../images/game/animals/animal-buffalo.png';

const textures = {
  [ANIMALS.buffalo]: buffalo,
};

export class Store {
  constructor({ x, y, width, height }) {
    this._stage = new Container();

    this.storeRectangle = new StoreBox({ x, y, width, height });

    this.animalHead = new AnimalHead({ type: textures[ANIMALS.buffalo] });

    this.animalName = new InterfaceText({
      text: 'ANIMAL NAME',
      anchorX: 0,
      anchorY: 0,
      x: x + 85,
      y: y + 40,
      font: 'Arial Black',
      fontSize: 16,
      fontWeight: 'normal',
      fillColor: '0x6B4B3A',
    });

    this.amountBar = new StoreBar({ x, y: 250, width, height, name: 'AMOUNT' });

    this.productsBar = new StoreBar({ x, y: 305, width, height, name: 'PRODUCTS' });

    this.closeButton = new CloseButton({ x, y, width });

    this.stage.addChild(this.storeRectangle.stage, this.animalHead.stage, this.animalName.stage, this.amountBar.stage, this.productsBar.stage, this.closeButton.stage);
  }

  get stage() {
    return this._stage;
  }
}
