import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { compose } from 'ramda';

import { Container } from './icon.styles';


export class IconComponent extends PureComponent {
  static propTypes = {
    src: PropTypes.string.isRequired,
  };

  render() {
    const { src } = this.props;
    return (
      <Container src={src} />
    );
  }
}

export const Icon = compose(
  injectIntl,
)(IconComponent);
