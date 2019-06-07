import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';
import { compose } from 'ramda';
import homeIcon from '../../../images/game/ui/homescreen_icon.png';
import upgradeIcon from '../../../images/game/ui/upgradescreen_icon.png';

import { Container, Box, Icon } from './instruction.styles';
import { Button } from './../../../theme/typography';
import messages from './instruction.messages';

export const INSTRUCTION_READED = 'instruction_readed';
const getIcon = (name, value) => ({ [name]: <Icon src={value} /> });

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
          <p>
            <FormattedMessage {...messages.welcome} />
          </p>
          <p>
            <FormattedMessage {...messages.rules} />
          </p>
          <ul>
            <li><FormattedMessage {...messages.rule1} values={{
              ...getIcon('upgradeIcon', upgradeIcon) }}
            /></li>
            <li><FormattedMessage {...messages.rule2} values={{
              ...getIcon('homeIcon', homeIcon),
            }}
            /></li>
            <li><FormattedMessage {...messages.rule3} /></li>
          </ul>
          <p>
            <FormattedMessage {...messages.buyNew} />
          </p>
          <p>
            <FormattedMessage {...messages.goodTime} />
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
