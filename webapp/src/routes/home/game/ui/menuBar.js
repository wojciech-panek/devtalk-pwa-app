import { Container } from 'pixi.js';

import { MenuButton } from './menuButton';
import { GameState, states } from '../game.state';

import homeIcon from '../../../../images/game/ui/homescreen_icon.png';
import upgradeIcon from '../../../../images/game/ui/upgradescreen_icon.png';


export class MenuBar {
  constructor({ containerSize }) {
    this._stage = new Container();

    this.menuBoxHome = new MenuButton({
      x: 0,
      y: containerSize.height - 70,
      width: containerSize.width / 2,
      height: 70,
      icon: homeIcon,
      active: GameState.state === states.HOME,
      onClick: this.handleHomeClick,
    });

    this.menuBoxUpgrade = new MenuButton({
      x: containerSize.width / 2,
      y: containerSize.height - 70,
      width: containerSize.width / 2,
      height: 70,
      icon: upgradeIcon,
      active: GameState.state === states.UPGRADING || GameState.state === states.BUYING,
      onClick: this.handleUpgradeClick,
    });

    this.stage.addChild(this.menuBoxHome.stage, this.menuBoxUpgrade.stage);
    GameState.onStateChange(this.handleStateUpdate);
  }

  handleStateUpdate = () => {
    this.menuBoxHome.active = GameState.state === states.HOME;
    this.menuBoxUpgrade.active = GameState.state === states.UPGRADING || GameState.state === states.BUYING;
  };

  handleHomeClick = () => {
    GameState.changeState(states.HOME);
  };

  handleUpgradeClick = () => {
    GameState.changeState(states.UPGRADING);
  };

  get stage() {
    return this._stage;
  }

  set containerSize(value) {
    this.menuBoxHome.y = value.height - 70;
    this.menuBoxHome.width = value.width / 2;

    this.menuBoxUpgrade.x = value.width / 2;
    this.menuBoxUpgrade.y = value.height - 70;
    this.menuBoxUpgrade.width = value.width / 2;
  }
}
