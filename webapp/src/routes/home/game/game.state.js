import EventEmitter from 'eventemitter3';


class GameStateClass {
  constructor() {
    this._reduxStateEventEmitter = new EventEmitter();
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

  onReduxStateChange = (callback) => this._reduxStateEventEmitter.on('reduxStateChange', callback);
}

export const GameState = new GameStateClass();
