import { Container } from 'pixi.js';

import { FENCES_INITIAL_Y, FENCES_ROWS, FOOD } from '../game.constants';
import { AnimalLevel } from './animalLevel';
import { AnimalHead } from './animalHead';
import { FoodItem } from './foodItem';
import { InterfaceText } from '../ui/interfaceText';
import { GameState } from '../game.state';


export class Animal {
  constructor({ rendererWidth, rendererHeight, onSellFood, onProduceFood, positionNumber }) {
    this._stage = new Container();
    this._positionNumber = this.getPositionNumber(positionNumber);
    this._onSellFood = onSellFood;
    this._onProduceFood = onProduceFood;

    this.stage.height = 89;
    this.stage.width = 92;

    this.calculatePosition(rendererWidth, rendererHeight, this.positionNumber);

    this.amount = new InterfaceText({
      text: `${this.animalData.amount}`,
      anchorX: 0.5,
      anchorY: 0.5,
      x: this.isEven(positionNumber) ? -25 : 25,
      y: 0,
      font: 'Arial Black',
      fontSize: 12,
      fontWeight: 'normal',
      fillColor: '0xFFFFFF',
    });

    this.level = new AnimalLevel({ positionNumber: this.positionNumber, flip: !this.isEven(positionNumber) });
    this.animalHead = new AnimalHead({
      type: this.animalData.type,
      onClick: this.handleAnimalHeadClick,
      flip: !this.isEven(positionNumber),
    });

    this.foodItem = new FoodItem({
      onClick: this.handleFoodItemClick,
      type: this.animalData.foodType,
      x: this.isEven(positionNumber) ? 38 : -82,
      y: -22,
    });

    this.foodAmountText = new InterfaceText({
      text: `${this.animalData.foodAmount}/${this.animalData.foodMaxAmount}`,
      anchorX: 0.5,
      anchorY: 0.5,
      x: this.isEven(positionNumber) ? 60 : -60,
      y: 30,
      font: 'Arial Black',
      fontSize: 8,
      fontWeight: 'bold',
      fillColor: '0xFFFFFF',
    });

    this.stage.addChild(
      this.level.stage, this.amount.stage, this.animalHead.stage, this.foodItem.stage, this.foodAmountText.stage
    );

    GameState.onReduxStateChange(this.handleReduxStateUpdate);
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

  handleReduxStateUpdate = () => {
    this.amount.setText(`${this.animalData.amount}`);
    this.foodAmountText.setText(`${this.animalData.foodAmount}/${this.animalData.foodMaxAmount}`);
  };

  handleFoodItemClick = () => {
    this._onSellFood(this.food.type, this.food.cost, this.animalData.foodAmount, this.fieldIndex);
  };

  handleAnimalHeadClick = () => {
    this._onProduceFood(this.food.type, this.fieldIndex);
  };

  get stage() {
    return this._stage;
  }

  get fieldIndex() {
    return GameState.reduxState.fields.findIndex((field) => field.position === this.positionNumber);
  }

  get positionNumber() {
    return this._positionNumber;
  }

  get food() {
    return FOOD[this.animalData.foodType];
  }

  get animalData() {
    return GameState.reduxState.fields[this.fieldIndex];
  }
}
