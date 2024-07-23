// ***********************************************
// https://on.cypress.io/custom-commands
// ***********************************************
/// <reference types="cypress" />

Cypress.Commands.add('normalizeText', { prevSubject: 'text' }, (text) => {
  return text
    .replace(/\n/g, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/\u00a0/g, ' ')
    .trim();
});
