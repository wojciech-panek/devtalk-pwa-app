import { Container } from 'pixi.js';
import { MENU_BAR_HOME, MENU_BAR_UPGRADE } from '../game.constants';
import { MenuButton } from './menuButton';

import homeIcon from '../../../../images/game/ui/homescreen_icon.png';
import upgradeIcon from '../../../../images/game/ui/upgradescreen_icon.png';

const textures = {
  [MENU_BAR_HOME]: homeIcon,
  [MENU_BAR_UPGRADE]: upgradeIcon,
};

export class MenuBar {
  constructor({ rendererWidth, renderedHeight }) {
    this._stage = new Container();

    this.menuBoxHome = new MenuButton({
      x: 0,
      y: renderedHeight - 70,
      width: rendererWidth / 2,
      height: 70,
      type: textures[MENU_BAR_HOME],
    });

    this.menuBoxUpgrade = new MenuButton({
      x: rendererWidth / 2,
      y: renderedHeight - 70,
      width: rendererWidth / 2,
      height: 70,
      type: textures[MENU_BAR_UPGRADE],
    });

    this.stage.addChild(this.menuBoxHome.stage, this.menuBoxUpgrade.stage);
  }

  get stage() {
    return this._stage;
  }
}
