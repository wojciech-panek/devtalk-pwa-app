import { Container } from 'pixi.js';
import { RectangleBox } from './rectangleBox';
import { InterfaceText } from './interfaceText';
import { AnimalHead } from '../elements/animalHead';
import { StoreBar } from './storeBar';
import { CloseButton } from './closeButton';

import { GameState, states } from '../game.state';
import { ANIMALS, WAREHOUSE_LEVELS } from '../game.constants';


export class Store {
  constructor({ x, y, width, height, actions }) {
    this._stage = new Container();
    this._stage.visible = this.isVisible;

    this._actions = actions;

    this.storeRectangle = new RectangleBox({ x, y, width, height, radius: 1 });

    this.animalHead = new AnimalHead({
      type: this.animalType,
      flip: false,
      interactive: false,
    });
    this.animalHead.stage.anchor.set(0.5);
    this.animalHead.stage.x = x + 35;
    this.animalHead.stage.y = y + 50;

    this.animalNameText = new InterfaceText({
      text: this.animalName,
      anchorX: 0,
      anchorY: 0,
      x: x + 85,
      y: y + 40,
      font: 'Arial Black',
      fontSize: 16,
      fontWeight: 'normal',
      fillColor: '0x6B4B3A',
    });

    this.amountBar = new StoreBar({
      x,
      y: 250,
      width,
      height,
      name: 'AMOUNT',
      amount: this.animalAmount,
      price: this.animalPrice,
      onClick: this.handleBuyAnimalClick,
    });
    this.warehouseBar = new StoreBar({
      x,
      y: 305,
      width,
      height,
      name: 'CAPACITY',
      amount: this.warehouseCapacity,
      price: this.warehousePrice,
      onClick: this.handleUpgradeWarehouseClick,
    });

    this.closeButton = new CloseButton({ x, y, width, onClick: this.handleCloseClick });

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
    return this.animalData ? ANIMALS[this.animalData.type].cost : '';
  }

  get warehouseCapacity() {
    return this.animalData ? WAREHOUSE_LEVELS[this.animalData.warehouseLevel].foodMaxAmount : '';
  }

  get warehousePrice() {
    return this.animalData ? WAREHOUSE_LEVELS[this.animalData.warehouseLevel].upgradeCost : '';
  }

  get fieldIndex() {
    return GameState.reduxState.fields.findIndex((field) => field.position === GameState.selectedAnimalPosition);
  }

  get animalData() {
    return GameState.reduxState.fields[this.fieldIndex];
  }

  get actions() {
    return this._actions;
  }
}
