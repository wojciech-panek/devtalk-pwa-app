import { Sprite, Texture, Container } from 'pixi.js';

import launchBackground from '../../../../images/game/launch.jpg';
import gameLogo from '../../../../images/game/game-logo.png';


export class Launcher {
  constructor({ containerSize, visible }) {
    this._stage = new Container();
    this._containerSize = containerSize;
    this.setupElements();

    this.stage.addChild(this.background);

    this.addLogo();

    this.stage.visible = visible;
  }

  addLogo() {
    const logoAsset = Texture.from(gameLogo);
    const logo = new Sprite(logoAsset);

    logo.width = 400 / 2;
    logo.height = 350 / 2;
    logo.anchor.set(0.5, 0);
    logo.x = this.containerSize.width / 2;
    logo.y = 30;

    this.stage.addChild(logo);
  }

  setupElements() {
    const { width, height } = this.containerSize;
    this.background = new Container();

    const backgroundTexture = Texture.from(launchBackground);
    const backgroundSprite = new Sprite(backgroundTexture);
    backgroundSprite.width = 1;
    backgroundSprite.height = 1;

    this.background.addChild(backgroundSprite);

    this.background.width = width;
    this.background.height = height;
  }

  get stage() {
    return this._stage;
  }

  set visible(value) {
    this.stage.visible = value;
  }

  get containerSize() {
    return this._containerSize;
  }
}
