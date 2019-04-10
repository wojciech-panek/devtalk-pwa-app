import { Container } from 'pixi.js';

import { FENCES_INITIAL_Y, FENCES_ROWS, FOOD, WAREHOUSE_LEVELS } from '../game.constants';
import { AnimalHead } from './animalHead';
import { AnimalProgress } from './animalProgress';
import { FoodItem } from './foodItem';
import { InterfaceText } from '../ui/interfaceText';
import { RectangleBox } from '../ui/rectangleBox';
import { GameState } from '../game.state';

export class Animal {
  constructor({ rendererWidth, rendererHeight, onSellFood, onPoke, positionNumber }) {
    this._stage = new Container();
    this._positionNumber = this.getPositionNumber(positionNumber);
    this._onSellFood = onSellFood;
    this._onPoke = onPoke;

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

    this.animalProgress = new AnimalProgress({
      startProductionTimestamp: this.animalData.startProductionTimestamp,
      productionDuration: this.animalData.productionDuration,
      pokeCount: this.animalData.pokeCount,
      flip: !this.isEven(positionNumber),
    });

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
      text: `${this.animalData.foodAmount}/${this.warehouseData.foodMaxAmount}`,
      anchorX: 0.5,
      anchorY: 0.5,
      x: this.isEven(positionNumber) ? 60 : -60,
      y: 30,
      font: 'Arial Black',
      fontSize: 8,
      fontWeight: 'bold',
      fillColor: '0xFFFFFF',
    });

    this.buyAnimalButton = new RectangleBox({
      x: this.isEven(positionNumber) ? -45 : 45,
      y: 25,
      width: 80,
      height: 25,
      radius: 2,
      color: '0x256D13',
    });

    this.buyAnimalButtonText = new InterfaceText({
      text: 'BUY',
      anchorX: 0.5,
      anchorY: 0.5,
      x: this.isEven(positionNumber) ? -5 : 5,
      y: 37,
      font: 'Arial Black',
      fontSize: 10,
      fontWeight: 'bold',
      fillColor: '0xFFFFFF',
    });

    this.stage.addChild(
      this.amount.stage,
      this.animalProgress.stage,
      this.animalHead.stage,
      this.foodItem.stage,
      this.foodAmountText.stage,
      this.buyAnimalButton.stage,
      this.buyAnimalButtonText.stage,
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
    this.foodAmountText.setText(`${this.animalData.foodAmount}/${this.warehouseData.foodMaxAmount}`);
    this.animalProgress.startProductTimestamp = this.animalData.startProductionTimestamp;
    this.animalProgress.productionDuration = this.animalData.productionDuration;
    this.animalProgress.pokeCount = this.animalData.pokeCount;
  };

  handleFoodItemClick = () => {
    this._onSellFood(this.food.type, this.food.cost, this.animalData.foodAmount, this.fieldIndex);
  };

  handleAnimalHeadClick = () => {
    this._onPoke(this.fieldIndex);
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

  get warehouseData() {
    return WAREHOUSE_LEVELS[this.animalData.warehouseLevel];
  }
}
