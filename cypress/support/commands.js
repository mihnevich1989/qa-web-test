// ***********************************************
// https://on.cypress.io/custom-commands
// ***********************************************
/// <reference types="cypress" />

import authorizationPage from '../page-objects/authorizationPage';

Cypress.Commands.add('loginByWebForm', (username = Cypress.env('USER_LOGIN'), password = Cypress.env('USER_PASS')) => {
  authorizationPage.fillLoginField(username);
  authorizationPage.fillPasswordField(password);
  cy.get(authorizationPage.submitButton).click();
});

Cypress.Commands.add('normalizeText', { prevSubject: 'text' }, (text) => {
  return text
    .replace(/\n/g, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/\u00a0/g, ' ')
    .trim();
});
