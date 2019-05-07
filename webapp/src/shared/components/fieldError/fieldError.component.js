import React, { PureComponent } from 'react';
import { compose } from 'ramda';
import { injectIntl, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { Container, Content } from './fieldError.styles';
import { renderWhenTrue } from '../../utils/rendering';


export class FieldErrorComponent extends PureComponent {
  static propTypes = {
    error: PropTypes.object,
  };

  renderContent = renderWhenTrue(() => (
    <Content>
      <FormattedMessage {...this.props.error} />
    </Content>
  ));

  render() {
    return (
      <Container>
        {this.renderContent(!!this.props.error)}
      </Container>
    );
  }
}

export const FieldError = compose(
  injectIntl,
)(FieldErrorComponent);
