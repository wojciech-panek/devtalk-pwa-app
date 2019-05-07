import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { withFormik } from 'formik';
import { hot } from 'react-hot-loader';
import { compose } from 'ramda';
import { object, string } from 'yup';
import messages from './newGameForm.messages';

import { NewGameForm } from './newGameForm.component';
import { UserAuthActions } from '../../../modules/userAuth';


const mapStateToProps = createStructuredSelector({});


export const mapDispatchToProps = (dispatch) => bindActionCreators({
  createUser: UserAuthActions.createUser,
}, dispatch);

export default compose(
  hot(module),
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl,
  withRouter,
  withFormik({
    handleSubmit: NewGameForm.onSubmit,
    validateOnBlur: true,
    validationSchema: object().shape({
      email: string()
        .required(messages.emailRequiredError)
        .email(messages.emailFormatError),
      password: string()
        .required(messages.passwordRequiredError)
        .test('passwords-match', messages.passwordMatchError, function (value) {
          return this.parent.confirmPassword === value; // eslint-disable-line babel/no-invalid-this
        }),
      confirmPassword: string()
        .required(messages.passwordRequiredError)
        .test('passwords-match', messages.passwordMatchError, function (value) {
          return this.parent.password === value; // eslint-disable-line babel/no-invalid-this
        }),
    }),
    mapPropsToValues: () => ({
      email: '',
      password: '',
      confirmPassword: '',
    }),
  })
)(NewGameForm);
