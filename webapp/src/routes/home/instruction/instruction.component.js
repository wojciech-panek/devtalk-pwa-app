import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';
import { compose } from 'ramda';
import homeIcon from '../../../images/game/ui/homescreen_icon.png';
import upgradeIcon from '../../../images/game/ui/upgradescreen_icon.png';

import { Container, Box } from './instruction.styles';
import { Button } from './../../../theme/typography';
import { Icon } from './components/icon';
import messages from './instruction.messages';

export const INSTRUCTION_READED = 'instruction_readed';

export class InstructionComponent extends PureComponent {
  static propTypes = {
    hideInstruction: PropTypes.func.isRequired,
  };
  handleClose = () => {
    localStorage.setItem(INSTRUCTION_READED, true);
    this.props.hideInstruction();
  };

  render() {
    return (
      <Container>
        <Box>
          <p>Welcome to Farmtension, a farm-themed PWA game made at Apptension’s DevTalks.</p>
          <p>There are only a few rules to the game:</p>
          <ul>
            <li>you buy animals by clicking <Icon src={upgradeIcon} /></li>
            <li>you return to your farm by clicking <Icon src={homeIcon} /></li>
            <li>you sell eggs, meat, etc. by clicking on them.</li>
          </ul>
          <p>
          When you earn enough money, you can upgrade your animals or buy new ones.<br /><br />
          Have a good time farming with us!
          </p>

          <Button onClick={this.handleClose} type="button">
            <FormattedMessage {...messages.button} />
          </Button>
        </Box>
      </Container>
    );
  }
}


export const Instruction = compose(
  injectIntl,
)(InstructionComponent);
