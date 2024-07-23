/// <reference types="cypress" />

import registrationPage from '../../page-objects/registrationPage';

const VALID_BORDER_COLOR = 'rgb(40, 167, 69)';
const INVALID_BORDER_COLOR = 'rgb(220, 53, 69)';

describe('Registration page', () => {

  beforeEach(() => {
    cy.visit('/registration');
  });

  context('Positive tests', () => {

    it('should be able all elements', { tags: '@smoke' }, () => {
      cy.get(registrationPage.nameField).should('be.visible');
      cy.get(registrationPage.emailField).should('be.visible');
      cy.get(registrationPage.passwordField).should('be.visible');
      cy.get(registrationPage.submitButton).should('be.visible');
    });

    it('should be visible correct validation', () => {
      registrationPage.fillNameField(Cypress.env('REGISTRATION_NAME')).should('have.css', 'border-color', registrationPage.VALID_BORDER_COLOR);
      registrationPage.fillEmailField(Cypress.env('REGISTRATION_EMAIL')).should('have.css', 'border-color', VALID_BORDER_COLOR);
      registrationPage.fillPasswordField(Cypress.env('REGISTRATION_PASS')).should('have.css', 'border-color', VALID_BORDER_COLOR);
    });
  });
});
