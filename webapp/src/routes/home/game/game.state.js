import EventEmitter from 'eventemitter3';
import machina from 'machina';


export const states = {
  HOME: 'home',
  UPGRADING: 'upgrading',
  BUYING: 'buying',
};

class GameStateClass {
  constructor() {
    this._reduxStateEventEmitter = new EventEmitter();
    this._stateEventEmitter = new EventEmitter();
    this._selectedAnimalPosition = -1;

    this._state = new machina.Fsm({
      initialState: states.HOME,
      states: {
        [states.HOME]: {
          _onEnter: () => this._stateEventEmitter.emit('homeStateEnter'),
          _onExit: () => this._stateEventEmitter.emit('homeStateExit'),
        },
        [states.UPGRADING]: {
          _onEnter: () => this._stateEventEmitter.emit('upgradingStateEnter'),
          _onExit: () => this._stateEventEmitter.emit('upgradingStateExit'),
        },
        [states.BUYING]: {
          _onEnter: () => this._stateEventEmitter.emit('buyingStateEnter'),
          _onExit: () => this._stateEventEmitter.emit('buyingStateExit'),
        },
      },
    });
  }

  set reduxState(reduxState) {
    const isInitialized = !!this._reduxState;
    this._reduxState = reduxState;

    if (isInitialized) {
      this._reduxStateEventEmitter.emit('reduxStateChange');
    }
  }

  get reduxState() {
    return this._reduxState;
  }

  get state() {
    return this._state.state;
  }

  get selectedAnimalPosition() {
    return this._selectedAnimalPosition;
  }

  set selectedAnimalPosition(value) {
    this._selectedAnimalPosition = value;
  }

  changeState = state => this._state.transition(state);

  onReduxStateChange = (callback) => this._reduxStateEventEmitter.on('reduxStateChange', callback);
  onStateChange = (callback) => this._state.on('transition', callback);

  onHomeStateEnter = (callback) => this._stateEventEmitter.on('homeStateEnter', callback);
  onHomeStateExit = (callback) => this._stateEventEmitter.on('homeStateExit', callback);
  onUpgradingStateEnter = (callback) => this._stateEventEmitter.on('upgradingStateEnter', callback);
  onUpgradingStateExit = (callback) => this._stateEventEmitter.on('upgradingStateExit', callback);
  onBuyingStateEnter = (callback) => this._stateEventEmitter.on('buyingStateEnter', callback);
  onBuyingStateExit = (callback) => this._stateEventEmitter.on('buyingStateExit', callback);
}

export const GameState = new GameStateClass();
