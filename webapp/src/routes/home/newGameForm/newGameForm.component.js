import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';
import { compose } from 'ramda';

import { FormContainer } from './newGameForm.styles';
import { Button } from './../../../theme/typography';
import { InputField } from './../../../shared/components/inputField';
import messages from './newGameForm.messages';


export class NewGameFormComponent extends PureComponent {
  static propTypes = {
    values: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    createUser: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    isValid: PropTypes.bool.isRequired,
  };

  static onSubmit = ({ email, password }, formik) => {
    formik.props.createUser(email, password, formik);
  };

  render() {
    const {
      values,
      touched,
      errors,
      handleSubmit,
      handleChange,
      handleBlur,
      isSubmitting,
      isValid,
      intl: { formatMessage },
    } = this.props;

    return (
      <FormContainer onSubmit={handleSubmit}>
        <InputField
          name="email"
          placeholder={`${formatMessage(messages.email)}*`}
          value={values.email}
          error={touched.email && errors.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <InputField
          name="password"
          type="password"
          placeholder={`${formatMessage(messages.password)}*`}
          value={values.password}
          error={touched.password && errors.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <InputField
          name="confirmPassword"
          type="password"
          placeholder={`${formatMessage(messages.confirmPassword)}*`}
          value={values.confirmPassword}
          error={touched.confirmPassword && errors.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <Button
          type="submit"
          disabled={isSubmitting || !isValid}
        >
          <FormattedMessage {...messages.submit} />
        </Button>
        <Button onClick={this.props.onBack}><FormattedMessage {...messages.back} /></Button>
      </FormContainer>
    );
  }
}

export const NewGameForm = compose(
  injectIntl,
)(NewGameFormComponent);
