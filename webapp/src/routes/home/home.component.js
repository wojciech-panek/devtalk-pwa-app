import React, { PureComponent, createRef, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';

import { Game } from './game';
import { GameState, states } from './game/game.state';
import { Container, GameWrapper, Interface, InterfaceBox } from './home.styles';
import { Button } from '../../theme/typography';
import { LoginForm } from './loginForm';
import { NewGameForm } from './newGameForm';
import { Instruction } from './instruction';
import { renderWhenTrue } from '../../shared/utils/rendering';
import messages from './home.messages';


export const MAX_GAME_WIDTH = 768;
export const MAX_GAME_HEIGHT = 1024;

export class Home extends PureComponent {
  static propTypes = {
    isUserAnonymous: PropTypes.bool.isRequired,
    userUid: PropTypes.string,
    sellFood: PropTypes.func.isRequired,
    pokeAnimal: PropTypes.func.isRequired,
    buyAnimal: PropTypes.func.isRequired,
    upgradeWarehouse: PropTypes.func.isRequired,
    gameData: PropTypes.instanceOf(Map).isRequired,
    shouldDisplayInstruction: PropTypes.bool.isRequired,
    hideInstruction: PropTypes.func.isRequired,
  };

  state = {
    showInstallButton: false,
    showNewGameForm: false,
    showLoginForm: false,
    showToBigDialog: this.isToBig,
  };

  componentDidMount() {
    this.startGame();

    window.addEventListener('beforeinstallprompt', this.handleInstallPrompt);
    window.addEventListener('resize', this.handleResize);
  }

  componentDidUpdate(prevProps) {
    const { isUserAnonymous, gameData } = this.props;

    if (!isUserAnonymous && GameState.state === states.NOT_LOGGED_IN) {
      GameState.changeState(states.HOME);
    }

    if (prevProps.gameData !== gameData) {
      GameState.reduxState = gameData.toJS();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('beforeinstallprompt', this.handleInstallPrompt);
    window.removeEventListener('resize', this.handleResize);
  }

  get isToBig() {
    return window.innerWidth > MAX_GAME_WIDTH || window.innerHeight > MAX_GAME_HEIGHT;
  }

  handleInstallPrompt = (event) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    event.preventDefault();
    // Stash the event so it can be triggered later.
    this.callPwaPromptEvent = event;
    this.setState({ showInstallButton: true });
  };

  handleInstallClick = () => {
    this.callPwaPromptEvent.prompt();
    // Wait for the user to respond to the prompt
    this.callPwaPromptEvent.userChoice.then(() => {
      this.setState({ showInstallButton: false });
      this.callPwaPromptEvent = null;
    });
  };

  handleLogInClick = () => this.setState({ showLoginForm: true });

  handleNewGameClick = () => this.setState({ showNewGameForm: true });

  handleBackClick = () => this.setState({ showLoginForm: false, showNewGameForm: false });

  handleResize = () => {
    if (this.isToBig && GameState.state !== states.TO_BIG) {
      GameState.changeState(states.TO_BIG);
    }

    if (!this.isToBig && GameState.state === states.TO_BIG && this.props.isUserAnonymous) {
      GameState.changeState(states.NOT_LOGGED_IN);
    }

    if (!this.isToBig && GameState.state === states.TO_BIG && !this.props.isUserAnonymous) {
      GameState.changeState(states.HOME);
    }

    this.setState({ showToBigDialog: this.isToBig });
  };

  startGame = () => {
    const {
      isUserAnonymous, sellFood, pokeAnimal, buyAnimal, upgradeWarehouse, gameData,
    } = this.props;

    if (this.isToBig && GameState.state !== states.TO_BIG) {
      GameState.changeState(states.TO_BIG);
    }

    if (!this.isToBig && !isUserAnonymous && GameState.state === states.NOT_LOGGED_IN) {
      GameState.changeState(states.HOME);
    }

    GameState.reduxState = gameData.toJS();
    this.game = new Game({
      htmlElement: this.pixiWrapperRef.current,
      anonymousPlayer: isUserAnonymous,
      state: gameData.toJS(),
      actions: {
        sellFood,
        pokeAnimal,
        buyAnimal,
        upgradeWarehouse,
      },
    });
  };

  game = null;
  pixiWrapperRef = createRef();

  checkIsInstructionNeeded = () => this.props.shouldDisplayInstruction;

  renderInstallButton = renderWhenTrue(() => (
    <Button onClick={this.handleInstallClick}><FormattedMessage {...messages.install} /></Button>
  ));

  renderButtons = renderWhenTrue(() => (
    <Fragment>
      <Button onClick={this.handleLogInClick}><FormattedMessage {...messages.logIn} /></Button>

      <Button onClick={this.handleNewGameClick}><FormattedMessage {...messages.newGame} /></Button>

      {this.renderInstallButton(this.state.showInstallButton)}
    </Fragment>
  ));

  renderLoginForm = renderWhenTrue(() => <LoginForm onBack={this.handleBackClick} />);

  renderNewGameForm = renderWhenTrue(() => <NewGameForm onBack={this.handleBackClick} />);

  renderInterface = renderWhenTrue(() => (
    <Interface>
      <InterfaceBox>
        {this.renderButtons(!this.state.showLoginForm && !this.state.showNewGameForm)}

        {this.renderLoginForm(this.state.showLoginForm)}

        {this.renderNewGameForm(this.state.showNewGameForm)}
      </InterfaceBox>
    </Interface>
  ));

  renderToBigDialog = renderWhenTrue(() => (
    <Interface>
      <InterfaceBox>
        <FormattedHTMLMessage {...messages.toBigText} />
      </InterfaceBox>
    </Interface>
  ));

  renderInstruction = renderWhenTrue(() => (
    <Instruction hideInstruction={this.props.hideInstruction} />
  ));

  render = () => (
    <Container>
      {this.renderInterface(this.props.isUserAnonymous && !this.state.showToBigDialog)}

      {this.renderToBigDialog(this.state.showToBigDialog)}

      {this.renderInstruction(this.checkIsInstructionNeeded())}

      <GameWrapper ref={this.pixiWrapperRef} />
    </Container>
  );
}
