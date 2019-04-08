import EventEmitter from 'eventemitter3';
import machina from 'machina';


export const states = {
  READY: 'ready',
  UPGRADING: 'upgrading',
};

class GameStateClass {
  constructor() {
    this._reduxStateEventEmitter = new EventEmitter();
    this._stateEventEmitter = new EventEmitter();

    this._state = new machina.Fsm({
      initialState: states.READY,
      states: {
        [states.READY]: {
          _onEnter: () => this._stateEventEmitter.emit('readyStateEnter'),
          _onExit: () => this._stateEventEmitter.emit('readyStateExit'),
        },
        [states.UPGRADING]: {
          _onEnter: () => this._stateEventEmitter.emit('upgradingStateEnter'),
          _onExit: () => this._stateEventEmitter.emit('upgradingStateExit'),
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
    return this._state;
  }

  changeState = state => this.state.transition(state);

  onReduxStateChange = (callback) => this._reduxStateEventEmitter.on('reduxStateChange', callback);

  onReadyStateEnter = (callback) => this._stateEventEmitter.on('readyStateEnter', callback);
  onReadyStateExit = (callback) => this._stateEventEmitter.on('readyStateExit', callback);
  onUpgradingStateEnter = (callback) => this._stateEventEmitter.on('upgradingStateEnter', callback);
  onUpgradingStateExit = (callback) => this._stateEventEmitter.on('upgradingStateExit', callback);
}

export const GameState = new GameStateClass();
