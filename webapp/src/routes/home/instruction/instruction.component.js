import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import { compose } from 'ramda';
import homeIcon from '../../../images/game/ui/homescreen_icon.png';
import upgradeIcon from '../../../images/game/ui/upgradescreen_icon.png';

import { Container, Box, Icon, Ul, Li, P } from './instruction.styles';
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
          <P>
            <FormattedHTMLMessage {...messages.welcome} />
          </P>
          <P>
            <FormattedHTMLMessage {...messages.rules} />
          </P>
          <Ul>
            <Li><FormattedMessage {...messages.rule1} values={{
              ...getIcon('upgradeIcon', upgradeIcon) }}
            /></Li>
            <Li><FormattedMessage {...messages.rule2} values={{
              ...getIcon('homeIcon', homeIcon),
            }}
            /></Li>
            <Li><FormattedMessage {...messages.rule3} /></Li>
          </Ul>
          <P>
            <FormattedHTMLMessage {...messages.buyNew} />
          </P>
          <P>
            <FormattedHTMLMessage {...messages.goodTime} />
          </P>
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
