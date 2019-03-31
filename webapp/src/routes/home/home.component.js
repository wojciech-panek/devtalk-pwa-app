import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { Game } from './game';
import { Container, GameWrapper } from './home.styles';


export class Home extends PureComponent {
  static propTypes = {
    isUserAnonymous: PropTypes.bool.isRequired,
    userUid: PropTypes.string,
    signInViaGoogle: PropTypes.func.isRequired,
    gameData: PropTypes.instanceOf(Map).isRequired,
  };

  componentDidMount() {
    this.startGame();
  }

  componentDidUpdate(prevProps) {
    const { isUserAnonymous, gameData } = this.props;

    if (!isUserAnonymous && prevProps.gameData.size === 0 && gameData.size > 0) {
      this.game.updateGame({
        anonymousPlayer: isUserAnonymous,
        state: gameData.toJS(),
      });
    }
  }

  startGame = () => {
    const { isUserAnonymous, signInViaGoogle, gameData } = this.props;

    this.game = new Game({
      htmlElement: this.pixiWrapperRef.current,
      anonymousPlayer: isUserAnonymous,
      loginViaGoogle: signInViaGoogle,
      state: gameData.toJS(),
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
