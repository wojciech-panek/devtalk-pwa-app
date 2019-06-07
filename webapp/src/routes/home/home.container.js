import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { hot } from 'react-hot-loader';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { compose } from 'ramda';

import { Home } from './home.component';
import { selectUserIsAnonymous, selectUserUid } from '../../modules/userAuth';
import { selectUserGame, selectShouldDisplayInstruction, GameActions } from '../../modules/game';


const mapStateToProps = createStructuredSelector({
  isUserAnonymous: selectUserIsAnonymous,
  userUid: selectUserUid,
  gameData: selectUserGame,
  shouldDisplayInstruction: selectShouldDisplayInstruction,
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  sellFood: GameActions.sellFood,
  pokeAnimal: GameActions.pokeAnimal,
  buyAnimal: GameActions.buyAnimal,
  upgradeWarehouse: GameActions.upgradeWarehouse,
  hideInstruction: GameActions.hideInstruction,
}, dispatch);

export default compose(
  hot(module),
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl,
  withRouter
)(Home);
