import React, { PureComponent, createRef, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { FormattedMessage } from 'react-intl';

import { Game } from './game';
import { GameState, states } from './game/game.state';
import { Container, GameWrapper, Interface, InterfaceBox } from './home.styles';
import { Button } from '../../theme/typography';
import { LoginForm } from './loginForm';
import { NewGameForm } from './newGameForm';
import { renderWhenTrue } from '../../shared/utils/rendering';
import messages from './home.messages';


export class Home extends PureComponent {
  static propTypes = {
    isUserAnonymous: PropTypes.bool.isRequired,
    userUid: PropTypes.string,
    createUser: PropTypes.func.isRequired,
    sellFood: PropTypes.func.isRequired,
    pokeAnimal: PropTypes.func.isRequired,
    buyAnimal: PropTypes.func.isRequired,
    upgradeWarehouse: PropTypes.func.isRequired,
    gameData: PropTypes.instanceOf(Map).isRequired,
  };

  state = {
    showInstallButton: false,
    showNewGameForm: false,
    showLoginForm: false,
  };

  componentDidMount() {
    this.startGame();

    window.addEventListener('beforeinstallprompt', this.handleInstallPrompt);
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

  startGame = () => {
    const {
      isUserAnonymous, sellFood, pokeAnimal, buyAnimal, upgradeWarehouse, gameData,
    } = this.props;

    if (!isUserAnonymous && GameState.state === states.NOT_LOGGED_IN) {
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

  render = () => (
    <Container>
      {this.renderInterface(this.props.isUserAnonymous)}

      <GameWrapper ref={this.pixiWrapperRef} />
    </Container>
  );
}
