import { createActions } from 'reduxsauce';

export const { Types: StartupTypes, Creators: StartupActions } = createActions({
  startup: null,
  initializeFirebaseApp: [],
  registerServiceWorker: [],
}, { prefix: 'STARTUP_' });
