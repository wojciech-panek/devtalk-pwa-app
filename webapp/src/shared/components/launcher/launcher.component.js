import { Sprite, Texture, Container } from 'pixi.js';

import launchBackground from '../../../images/game/launch.jpg';
import gameLogo from '../../../images/game/game-logo.png';
import Button, { DEFAULT_BUTTON_HEIGHT, VERTICAL_OFFSET } from './button';
import Background from './background';
import { isInStandaloneMode } from '../../../theme/media';


export class Launcher {
  constructor({ loginViaGoogle, callPwaPrompt, containerSize }) {
    this._stage = new Container();
    this._containerSize = containerSize;
    this._callPwaPrompt = callPwaPrompt;
    this.loginButton = new Button({
      text: 'Login via Google',
      onClick: loginViaGoogle,
    });
    this.installButtonContainer = new Container();
    this.background = new Background({
      image: launchBackground,
    });
    this.setupElements();

    this.stage.addChild(this.background.stage, this.loginButton.stage);

    this.addLogo();

    this.listenForPwaEvent();
  }

  listenForPwaEvent() {
    window.addEventListener('beforeinstallprompt', (event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      event.preventDefault();
      // Stash the event so it can be triggered later.
      this.callPwaPrompt = event;
      this.showInstallButton(true);
    });
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
    this.background.stage.width = width;
    this.background.stage.height = height;
  }

  showInstallButton(show) {
    if (show) {
      if (this.installButtonContainer.children.length === 0) {
        this.createInstallButton();
      }
      this.installButtonContainer.visible = true;
    } else {
      this.installButtonContainer.visible = false;
    }
  }

  createInstallButton() {
    const { width, height } = this.containerSize;
    const installButton = new Button({
      text: 'Install application',
      onClick: this.callPwaPromptAction.bind(this),
    });

    installButton.stage.x = width / 2;
    installButton.stage.y = height / 2 + DEFAULT_BUTTON_HEIGHT + VERTICAL_OFFSET;

    this.installButtonContainer.addChild(installButton.stage);
    this.stage.addChild(this.installButtonContainer);
  }

  callPwaPromptAction() {
    const self = this;

    this.callPwaPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.callPwaPrompt.userChoice
      .then(function (choiceResult) {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        self.showInstallButton(false);
        self.callPwaPrompt = null;
      });
  }

  get stage() {
    return this._stage;
  }

  get containerSize() {
    return this._containerSize;
  }

  get callPwaPrompt() {
    return this._callPwaPrompt;
  }

  set callPwaPrompt(value) {
    this._callPwaPrompt = value;
  }

  get isPWA() {
    return isInStandaloneMode();
  }
}
