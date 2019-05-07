import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { withFormik } from 'formik';
import { hot } from 'react-hot-loader';
import { compose } from 'ramda';
import { object, string } from 'yup';
import messages from './loginForm.messages';

import { LoginForm } from './loginForm.component';
import { UserAuthActions } from '../../../modules/userAuth';


const mapStateToProps = createStructuredSelector({});


export const mapDispatchToProps = (dispatch) => bindActionCreators({
  signIn: UserAuthActions.signIn,
}, dispatch);

export default compose(
  hot(module),
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl,
  withRouter,
  withFormik({
    handleSubmit: LoginForm.onSubmit,
    validateOnBlur: true,
    validationSchema: object().shape({
      email: string()
        .required(messages.emailRequiredError)
        .email(messages.emailFormatError),
      password: string()
        .required(messages.passwordRequiredError),
    }),
    mapPropsToValues: () => ({
      email: '',
      password: '',
    }),
  })
)(LoginForm);
