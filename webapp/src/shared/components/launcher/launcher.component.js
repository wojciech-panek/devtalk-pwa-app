import { Sprite, Texture, Container } from 'pixi.js';

import launchBackground from '../../../images/game/launch.jpg';
import gameLogo from '../../../images/game/game-logo.png';
import Button from './button';
import Background from './background';
import { isInStandaloneMode } from '../../../theme/media';


export class Launcher {
  constructor({ loginViaGoogle, callPwaPrompt, containerSize }) {
    this._stage = new Container();
    this._containerSize = containerSize;
    this.loginButton = new Button({
      text: 'Login via Google',
      onClick: loginViaGoogle,
    });
    this.installButton = new Button({
      text: 'Install application',
      onClick: callPwaPrompt,
    });
    this.background = new Background({
      image: launchBackground,
    });
    this.setupElements();

    this.stage.addChild(this.background.stage, this.loginButton.stage, this.installButton.stage);

    this.addLogo();
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
    this.loginButton.stage.x = width / 2;
    this.loginButton.stage.y = height / 2;
    this.installButton.stage.x = width / 2;
    this.installButton.stage.y = height / 2 + 50;
    this.background.stage.width = width;
    this.background.stage.height = height;
  }

  get stage() {
    return this._stage;
  }

  get containerSize() {
    return this._containerSize;
  }

  get isPWA() {
    return isInStandaloneMode();
  }
}
