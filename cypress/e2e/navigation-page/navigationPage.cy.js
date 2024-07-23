/// <reference types="cypress" />

import commonComponents from '../../page-objects/commonComponents';

describe('Navigation page', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('should be able all navigation links', { tags: '@smoke' }, () => {
    cy.get(commonComponents.logo)
      .should('be.visible')
      .click();
    cy.url().should('eq', Cypress.config('baseUrl'));
    cy.get(commonComponents.homeLink)
      .should('be.visible')
      .click();
    cy.url().should('eq', Cypress.config('baseUrl'));
    cy.get(commonComponents.registrationLink)
      .should('be.visible')
      .click();
    cy.url().should('eq', `${Cypress.config('baseUrl')}registration`);
    cy.get(commonComponents.loginLink)
      .should('be.visible')
      .click();
    cy.url().should('eq', `${Cypress.config('baseUrl')}login`);
  });
});
