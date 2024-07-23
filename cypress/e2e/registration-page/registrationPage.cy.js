/// <reference types="cypress" />

import registrationPage from '../../page-objects/registrationPage';
import { siteErrorComponent } from '../../page-objects/commonComponents';
import { validationErrorText } from '../../fixtures/registration_page.json';

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
      registrationPage.fillEmailField(Cypress.env('REGISTRATION_EMAIL')).should('have.css', 'border-color', registrationPage.VALID_BORDER_COLOR);
      registrationPage.fillPasswordField(Cypress.env('REGISTRATION_PASS')).should('have.css', 'border-color', registrationPage.VALID_BORDER_COLOR);
    });

    it('should be correct registration', { tags: '@smoke' }, () => {
      registrationPage.fillNameField(Cypress.env('REGISTRATION_NAME'));
      registrationPage.fillEmailField(Cypress.env('REGISTRATION_EMAIL'));
      registrationPage.fillPasswordField(Cypress.env('REGISTRATION_PASS'));
      registrationPage.submit();
      cy.get(siteErrorComponent).should('not.exist');
    });
  });

  context('Negative tests', () => {

    it('should be visible validation errors', () => {
      registrationPage.fillNameField(' ')
        .as('nameField')
        .clear()
        .should('have.css', 'border-color', registrationPage.INVALID_BORDER_COLOR);
      registrationPage.getValidationErrorText('@nameField').should('eq', validationErrorText.name);
      cy.get(registrationPage.emailField)
        .as('emailField')
        .should('have.css', 'border-color', registrationPage.INVALID_BORDER_COLOR);
      registrationPage.getValidationErrorText('@emailField').should('eq', validationErrorText.email);
      cy.get(registrationPage.passwordField)
        .as('passwordField')
        .should('have.css', 'border-color', registrationPage.INVALID_BORDER_COLOR);
      registrationPage.getValidationErrorText('@passwordField').should('eq', validationErrorText.password);
    });
  });
});
