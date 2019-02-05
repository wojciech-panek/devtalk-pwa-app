import React, { PureComponent } from 'react';
import { Container, GameWrapper } from './home.styles';
import { Game } from './game';

export class Home extends PureComponent {
  static propTypes = {
  };

  componentDidMount() {
    this.game = new Game({ htmlElement: this.gameWrapperRef.current });
  }

  gameWrapperRef = React.createRef();

  render() {
    return (
      <Container>
        <GameWrapper ref={this.gameWrapperRef} />
      </Container>
    );
  }
}
