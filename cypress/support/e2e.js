// ***********************************************************
// https://on.cypress.io/configuration
// ***********************************************************

import './commands';
import 'cypress-mochawesome-reporter/register';
import registerCypressGrep from '@cypress/grep/src/support';
registerCypressGrep();
