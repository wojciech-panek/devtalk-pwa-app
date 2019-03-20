import { createActions } from 'reduxsauce';

export const { Types: StartupTypes, Creators: StartupActions } = createActions({
  startup: null,
}, { prefix: 'STARTUP_' });
