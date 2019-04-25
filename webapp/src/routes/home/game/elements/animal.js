import { Container } from 'pixi.js';

import { FENCES_INITIAL_Y, FENCES_ROWS, FENCES_BOTTOM_MARGIN, FOOD, WAREHOUSE_LEVELS } from '../game.constants';
import { AnimalHead } from './animalHead';
import { AnimalProgress } from './animalProgress';
import { AnimalAmount } from './animalAmount';
import { AnimalButton } from './animalButton';
import { FoodItem } from './foodItem';
import { InterfaceText } from '../ui/interfaceText';
import { GameState, states } from '../game.state';

export class Animal {
  constructor({ rendererWidth, rendererHeight, onSellFood, onPoke, positionNumber }) {
    this._stage = new Container();
    this._animalContent = new Container();
    this._foodContent = new Container();
    this._positionNumber = this.getPositionNumber(positionNumber);
    this._onSellFood = onSellFood;
    this._onPoke = onPoke;

    this.stage.height = 89;
    this.stage.width = 92;

    this.calculatePosition(rendererWidth, rendererHeight, this.positionNumber);

    this.amount = new AnimalAmount({ flip: !this.isEven(positionNumber), positionNumber: this.positionNumber });

    this.animalProgress = new AnimalProgress({
      startProductionTimestamp: this.animalData ? this.animalData.startProductionTimestamp : null,
      productionDuration: this.animalData ? this.animalData.productionDuration : null,
      pokeCount: this.animalData ? this.animalData.pokeCount : 0,
      positionNumber: this.positionNumber,
      flip: !this.isEven(positionNumber),
    });

    this.animalHead = new AnimalHead({
      type: this.animalData ? this.animalData.type : null,
      onClick: this.handleAnimalHeadClick,
      flip: !this.isEven(positionNumber),
    });

    this.foodItem = new FoodItem({
      onClick: this.handleFoodItemClick,
      type: this.animalData ? this.animalData.foodType : null,
      x: this.isEven(positionNumber) ? 38 : -82,
      y: -22,
    });

    const foodAmount = this.animalData ? this.animalData.foodAmount : '';
    const foodMaxAmount = this.warehouseData ? this.warehouseData.foodMaxAmount : '';
    this.foodAmountText = new InterfaceText({
      text: `${foodAmount}/${foodMaxAmount}`,
      anchorX: 0.5,
      anchorY: 0.5,
      x: this.isEven(positionNumber) ? 60 : -60,
      y: 30,
      font: 'Arial Black',
      fontSize: 8,
      fontWeight: 'bold',
      fillColor: '0xFFFFFF',
    });

    this.buyAnimalButton = new AnimalButton({
      flip: !this.isEven(positionNumber),
      text: 'BUY',
      backgroundColor: 0x256D13,
      visible: this.isBuyAnimalButtonVisible,
      onClick: this.handleBuyClick,
    });

    this.upgradeAnimalButton = new AnimalButton({
      flip: !this.isEven(positionNumber),
      text: 'UPGRADE',
      backgroundColor: 0x8C0B12,
      visible: this.isUpgradeAnimalButtonVisible,
      onClick: this.handleUpgradeClick,
    });

    this._foodContent.addChild(
      this.animalProgress.stage,
      this.foodItem.stage,
      this.foodAmountText.stage,
    );

    this._animalContent.addChild(
      this._foodContent,
      this.amount.stage,
      this.animalHead.stage,
    );

    this._foodContent.visible = this.isFoodVisible;
    this._animalContent.visible = this.isAnimalVisible;

    this.stage.addChild(
      this._animalContent,
      this.buyAnimalButton.stage,
      this.upgradeAnimalButton.stage,
    );

    GameState.onReduxStateChange(this.handleReduxStateUpdate);
    GameState.onStateChange(this.handleStateUpdate);
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

    const yOffset = this.calculateRow(positionNumber) *
      ((rendererHeight - FENCES_BOTTOM_MARGIN - FENCES_INITIAL_Y) / FENCES_ROWS + additionalOffset);

    this.stage.y = FENCES_INITIAL_Y + yOffset;
  };

  handleReduxStateUpdate = () => {
    const foodAmount = this.animalData ? this.animalData.foodAmount : '';
    const foodMaxAmount = this.warehouseData ? this.warehouseData.foodMaxAmount : '';
    this.foodAmountText.setText(`${foodAmount}/${foodMaxAmount}`);
    this.animalProgress.startProductTimestamp = this.animalData.startProductionTimestamp;
    this.animalProgress.productionDuration = this.animalData.productionDuration;
    this.animalProgress.pokeCount = this.animalData.pokeCount;

    this.buyAnimalButton.visible = this.isBuyAnimalButtonVisible;
    this.upgradeAnimalButton.visible = this.isUpgradeAnimalButtonVisible;
    this._foodContent.visible = this.isFoodVisible;
    this._animalContent.visible = this.isAnimalVisible;
  };

  handleStateUpdate = () => {
    this.buyAnimalButton.visible = this.isBuyAnimalButtonVisible;
    this.upgradeAnimalButton.visible = this.isUpgradeAnimalButtonVisible;
    this._foodContent.visible = this.isFoodVisible;
    this._animalContent.visible = this.isAnimalVisible;
  };

  handleFoodItemClick = () => {
    this._onSellFood(this.food.type, this.food.cost, this.animalData.foodAmount, this.fieldIndex);
  };

  handleAnimalHeadClick = () => {
    this._onPoke(this.fieldIndex);
  };

  handleBuyClick = () => {
    GameState.selectedAnimalPosition = this.positionNumber;
    GameState.changeState(states.BUYING);
  };

  handleUpgradeClick = () => {
    GameState.selectedAnimalPosition = this.positionNumber;
    GameState.changeState(states.BUYING);
  };

  get isBuyAnimalButtonVisible() {
    return (GameState.state === states.UPGRADING || GameState.state === states.BUYING)
      && this.firstEmptyPosition === this.positionNumber;
  }

  get isUpgradeAnimalButtonVisible() {
    return (GameState.state === states.UPGRADING || GameState.state === states.BUYING) && this.animalData.amount > 0;
  }

  get isAnimalVisible() {
    return this.animalData.amount > 0;
  }

  get isFoodVisible() {
    return GameState.state === states.HOME;
  }

  get firstEmptyPosition() {
    if (!GameState.reduxState.fields) {
      return -1;
    }

    const emptyPositions = GameState.reduxState.fields.filter((field) => !field.amount).map((field) => field.position);
    return Math.min(...(emptyPositions || [-1]));
  }

  get stage() {
    return this._stage;
  }

  get fieldIndex() {
    if (!GameState.reduxState.fields) {
      return -1;
    }

    return GameState.reduxState.fields.findIndex((field) => field.position === this.positionNumber);
  }

  get positionNumber() {
    return this._positionNumber;
  }

  get food() {
    return FOOD[this.animalData.foodType];
  }

  get animalData() {
    if (this.fieldIndex === -1) {
      return null;
    }

    return GameState.reduxState.fields[this.fieldIndex];
  }

  get warehouseData() {
    if (!this.animalData) {
      return null;
    }

    return WAREHOUSE_LEVELS[this.animalData.warehouseLevel];
  }
}
