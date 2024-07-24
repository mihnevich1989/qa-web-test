/// <reference types="cypress" />

import commonComponents from '../../page-objects/commonComponents';

describe('Navigation page', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('should be able all navigation links', { tags: '@smoke' }, () => {
    commonComponents.goToHomePageViaLogo();
    cy.url().should('eq', Cypress.config('baseUrl'));
    commonComponents.goToHomePageViaLink();
    cy.url().should('eq', Cypress.config('baseUrl'));
    commonComponents.goToRegistrationPage();
    cy.url().should('eq', `${Cypress.config('baseUrl')}registration`);
    commonComponents.goToAuthorizationPage();
    cy.url().should('eq', `${Cypress.config('baseUrl')}login`);
  });
});
