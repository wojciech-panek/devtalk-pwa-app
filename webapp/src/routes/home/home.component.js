import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';

import { Game } from './game';
import { Container, GameWrapper } from './home.styles';


export class Home extends PureComponent {
  static propTypes = {
    isUserAnonymous: PropTypes.bool.isRequired,
    signInViaGoogle: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { isUserAnonymous, signInViaGoogle } = this.props;

    this.game = new Game({
      htmlElement: this.pixiWrapperRef.current,
      anonymousPlayer: isUserAnonymous,
      loginViaGoogle: signInViaGoogle,
    });
  }

  componentDidUpdate(prevProps) {
    const { isUserAnonymous } = this.props;

    if (prevProps.isUserAnonymous !== isUserAnonymous) {
      this.game.updateGame({
        anonymousPlayer: isUserAnonymous,
      });
    }
  }

  game = null;
  pixiWrapperRef = createRef();

  render = () => (
    <Container>
      <GameWrapper ref={this.pixiWrapperRef} />
    </Container>
  );
}
