// ***********************************************************
// https://on.cypress.io/configuration
// ***********************************************************

import './commands';
import 'dotenv/config';
import 'cypress-mochawesome-reporter/register';
import registerCypressGrep from '@cypress/grep/src/support';
registerCypressGrep();
