import { Container } from 'pixi.js';
import { RectangleBox } from './rectangleBox';
import { InterfaceText } from './interfaceText';
import { AnimalHead } from '../elements/animalHead';
import { StoreBar } from './storeBar';
import { CloseButton } from './closeButton';

import { GameState, states } from '../game.state';
import { ANIMALS, ANIMAL_COST_MODIFIER, WAREHOUSE_LEVELS } from '../game.constants';


export class Store {
  constructor({ actions, containerSize }) {
    this._stage = new Container();
    this._stage.visible = this.isVisible;
    this.x = containerSize.width * 0.05;
    this.y = 150;
    this.width = containerSize.width * 0.9;
    this.height = 285;

    this._actions = actions;

    this.storeRectangle = new RectangleBox({
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.rectangleBoxHeight,
      radius: 1,
    });

    this.animalHead = new AnimalHead({
      type: this.animalType,
      flip: false,
      interactive: false,
    });
    this.animalHead.stage.anchor.set(0.5);
    this.animalHead.stage.x = this.x + 35;
    this.animalHead.stage.y = this.y + 50;

    this.animalNameText = new InterfaceText({
      text: this.animalName,
      anchorX: 0,
      anchorY: 0,
      x: this.x + 85,
      y: this.y + 40,
      font: 'Arial Black',
      fontSize: 16,
      fontWeight: 'normal',
      fillColor: '0x6B4B3A',
    });

    this.amountBar = new StoreBar({
      x: this.x,
      y: 250,
      width: this.width,
      height: this.height,
      name: 'AMOUNT',
      amount: this.animalAmount,
      price: this.animalPrice,
      visible: true,
      onClick: this.handleBuyAnimalClick,
    });
    this.warehouseBar = new StoreBar({
      x: this.x,
      y: 305,
      width: this.width,
      height: this.height,
      name: 'CAPACITY',
      amount: this.warehouseCapacity,
      price: this.warehousePrice,
      visible: this.isWarehouseBarVisible,
      onClick: this.handleUpgradeWarehouseClick,
    });

    this.closeButton = new CloseButton({
      x: this.closeButtonX,
      y: this.closeButtonY,
      width: this.width,
      onClick: this.handleCloseClick,
    });

    this.stage.addChild(this.storeRectangle.stage, this.animalHead.stage, this.animalNameText.stage,
      this.amountBar.stage, this.warehouseBar.stage, this.closeButton.stage,
    );

    GameState.onReduxStateChange(this.handleStateChange);
    GameState.onStateChange(this.handleStateChange);
  }

  handleStateChange = () => {
    this.amountBar.amount = this.animalAmount;
    this.amountBar.price = this.animalPrice;
    this.warehouseBar.amount = this.warehouseCapacity;
    this.warehouseBar.price = this.warehousePrice;
    this.animalNameText.setText(this.animalName);
    this.animalHead.type = this.animalType;
    this.warehouseBar.visible = this.isWarehouseBarVisible;
    this.storeRectangle.height = this.rectangleBoxHeight;
    this.closeButton.x = this.closeButtonX;
    this.closeButton.y = this.closeButtonY;
    this._stage.visible = this.isVisible;
  };

  handleCloseClick = () => {
    GameState.changeState(states.UPGRADING);
    GameState.selectedAnimalPosition = -1;
  };

  handleBuyAnimalClick = () => {
    this.actions.buyAnimal(this.fieldIndex, this.animalPrice);
  };

  handleUpgradeWarehouseClick = () => {
    this.actions.upgradeWarehouse(this.fieldIndex, this.warehousePrice);
  };

  get isVisible() {
    return GameState.state === states.BUYING;
  }

  get rectangleBoxHeight() {
    if (this.isWarehouseBarVisible) {
      return this.height;
    }

    return this.height - 55;
  }

  get closeButtonX() {
    return this.x + this.width / 2 - 40;
  }

  get closeButtonY() {
    if (this.isWarehouseBarVisible) {
      return this.y + 232;
    }
    return this.y + 232 - 55;
  }

  get isWarehouseBarVisible() {
    if (!this.animalData) {
      return false;
    }

    return !!WAREHOUSE_LEVELS[this.animalData.warehouseLevel + 1] && this.animalAmount !== 0;
  }

  get stage() {
    return this._stage;
  }

  get animalAmount() {
    return this.animalData ? this.animalData.amount : 0;
  }

  get animalName() {
    return this.animalData ? this.animalData.type.toUpperCase() : '';
  }

  get animalType() {
    return this.animalData ? this.animalData.type : '';
  }

  get animalPrice() {
    const cost = this.animalData ? ANIMALS[this.animalData.type].cost : 0;
    return this.animalData ? cost + this.animalAmount * cost * ANIMAL_COST_MODIFIER : '';
  }

  get warehouseCapacity() {
    return this.animalData ? WAREHOUSE_LEVELS[this.animalData.warehouseLevel].foodMaxAmount : '';
  }

  get warehousePrice() {
    return this.animalData ? WAREHOUSE_LEVELS[this.animalData.warehouseLevel].upgradeCost : '';
  }

  get fieldIndex() {
    if (!GameState.reduxState.fields) {
      return -1;
    }

    return GameState.reduxState.fields.findIndex((field) => field.position === GameState.selectedAnimalPosition);
  }

  get animalData() {
    if (this.fieldIndex === -1) {
      return null;
    }

    return GameState.reduxState.fields[this.fieldIndex];
  }

  get actions() {
    return this._actions;
  }

  set containerSize(value) {
    this.x = value.width * 0.05;
    this.width = value.width * 0.9;

    this.storeRectangle.x = this.x;
    this.storeRectangle.width = this.width;
    this.animalNameText.x = this.x + 85;
    this.amountBar.x = this.x;
    this.amountBar.width = this.width;
    this.warehouseBar.x = this.x;
    this.warehouseBar.width = this.width;
    this.closeButton.x = this.closeButtonX;
    this.closeButton.y = this.closeButtonY;
  }
}
