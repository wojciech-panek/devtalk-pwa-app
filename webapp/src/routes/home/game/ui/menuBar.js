import { Container } from 'pixi.js';
import { RectangleMenuBox } from './rectangleMenuBox';
import { MENU_BAR_HOME, MENU_BAR_UPGRADE } from '../game.constants';

import homeIcon from '../../../../images/game/ui/homescreen_icon.png';
import upgradeIcon from '../../../../images/game/ui/upgradescreen_icon.png';

const textures = {
  [MENU_BAR_HOME]: homeIcon,
  [MENU_BAR_UPGRADE]: upgradeIcon,
};

export class MenuBar {
  constructor({ rendererWidth }) {
    this._stage = new Container();

    this.menuBoxHome = new RectangleMenuBox({ x: 0, y: 700, width: rendererWidth, height: 60, type: textures[MENU_BAR_HOME] });
    this.menuBoxUpgrade = new RectangleMenuBox({ x: rendererWidth / 2, y: 700, width: rendererWidth, height: 60, type: textures[MENU_BAR_UPGRADE] });

    this.stage.addChild(
      this.menuBoxHome.stage, this.menuBoxUpgrade
    );
  }

  get stage() {
    return this._stage;
  }
}
