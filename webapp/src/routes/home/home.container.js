import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { hot } from 'react-hot-loader';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { compose } from 'ramda';

import { Home } from './home.component';
import { selectUserIsAnonymous, UserAuthActions } from '../../modules/userAuth';


const mapStateToProps = createStructuredSelector({
  isUserAnonymous: selectUserIsAnonymous,
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  signInViaGoogle: UserAuthActions.signInViaGoogle,
}, dispatch);

export default compose(
  hot(module),
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl,
  withRouter
)(Home);
