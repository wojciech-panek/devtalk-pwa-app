import React, { PureComponent } from 'react';
import { compose } from 'ramda';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { Container, Input } from './inputField.styles';
import { FieldError } from '../fieldError';


export class InputFieldComponent extends PureComponent {
  static propTypes = {
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    error: PropTypes.object,
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
  };

  static defaultProps = {
    type: 'text',
  };

  render() {
    const { value, error, ...restOfProps } = this.props;

    return (
      <Container>
        <Input
          {...restOfProps}
          error={!!error}
          autoComplete="off"
          value={value || ''}
        />

        <FieldError error={error} />
      </Container>
    );
  }
}

export const InputField = compose(
  injectIntl,
)(InputFieldComponent);
