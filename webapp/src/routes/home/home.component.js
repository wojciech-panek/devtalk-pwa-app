import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { Game } from './game';
import { Container, GameWrapper } from './home.styles';


export class Home extends PureComponent {
  static propTypes = {
    isUserAnonymous: PropTypes.bool.isRequired,
    canShowPromptButton: PropTypes.bool.isRequired,
    userUid: PropTypes.string,
    signInViaGoogle: PropTypes.func.isRequired,
    callPwaPrompt: PropTypes.func.isRequired,
    gameData: PropTypes.instanceOf(Map).isRequired,
  };

  componentDidMount() {
    this.startGame();
  }

  componentDidUpdate(prevProps) {
    const { isUserAnonymous, canShowPromptButton, gameData } = this.props;

    if (!isUserAnonymous && prevProps.gameData.size === 0 && gameData.size > 0) {
      this.game.updateGame({
        anonymousPlayer: isUserAnonymous,
        state: gameData.toJS(),
      });
    }

    // if (!prevProps.canShowPromptButton && canShowPromptButton && isUserAnonymous) {
    //   this.game.updateLauncher({
    //     canShowPromptButton,
    //   });
    // }
  }

  startGame = () => {
    const { isUserAnonymous, signInViaGoogle, callPwaPrompt, gameData } = this.props;

    this.game = new Game({
      htmlElement: this.pixiWrapperRef.current,
      anonymousPlayer: isUserAnonymous,
      loginViaGoogle: signInViaGoogle,
      state: gameData.toJS(),
      // callPwaPrompt,
    });
  };

  game = null;
  pixiWrapperRef = createRef();

  render = () => (
    <Container>
      <GameWrapper ref={this.pixiWrapperRef} />
    </Container>
  );
}
