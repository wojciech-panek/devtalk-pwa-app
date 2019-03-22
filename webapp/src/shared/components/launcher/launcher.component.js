import { Sprite, Texture, Container } from 'pixi.js';

import launchBackground from '../../../images/game/launch.jpg';
import gameLogo from '../../../images/game/game-logo.png';
import Button from './button';
import Background from './background';


export class Launcher extends Container {
  constructor({ loginViaGoogle, containerSize }) {
    super();
    this.containerSize = containerSize;
    this.loginButton = new Button({
      text: 'Login via Google',
      onClick: loginViaGoogle,
    });
    this.background = new Background({
      image: launchBackground,
    });
    this.setupElements();

    this.addChild(this.background, this.loginButton);

    this.addLogo();
  }

  addLogo() {
    const logoAsset = Texture.from(gameLogo);
    const logo = new Sprite(logoAsset);

    logo.width = 399 / 2;
    logo.height = 137 / 2;
    logo.anchor.set(0.5, 0);
    logo.x = this.containerSize.width / 2;
    logo.y = 30;

    this.addChild(logo);
  }

  setupElements() {
    const { width, height } = this.containerSize;
    this.loginButton.x = width / 2;
    this.loginButton.y = height / 2;
    this.background.width = width;
    this.background.height = height;
  }
}
