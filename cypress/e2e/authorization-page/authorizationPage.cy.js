/// <reference types="cypress" />

import authorizationPage from '../../page-objects/authorizationPage';
import commonComponents from '../../page-objects/commonComponents';
import { validationErrorText, failedTestData } from '../../fixtures/authorization_page.json';

describe('Authorization page', () => {

  beforeEach(() => {
    cy.visit('/login');
  });

  context('Positive tests', () => {

    it('should be able form elements', { tags: '@smoke' }, () => {
      cy.get(authorizationPage.loginField).should('be.visible');
      cy.get(authorizationPage.passwordField).should('be.visible');
      cy.get(authorizationPage.submitButton).should('be.visible');
    });

    it('should be visible correct validation', () => {
      authorizationPage.fillLoginField(Cypress.env('USER_LOGIN')).should('have.css', 'border-color', authorizationPage.validBorderColor);
      authorizationPage.fillPasswordField(Cypress.env('USER_PASS')).should('have.css', 'border-color', authorizationPage.validBorderColor);
    });

    it('should be logged in', { tags: '@smoke' }, () => {
      cy.loginByWebForm();
      commonComponents.checkUserLogin(Cypress.env('USER_LOGIN'));
      commonComponents.isPageErrorNotPresent();
    });
  });

  context('Negative tests', () => {

    it('should be visible validation errors', () => {
      authorizationPage.fillLoginField(' ')
        .as('loginField')
        .clear()
        .should('have.css', 'border-color', authorizationPage.invalidBorderColor);
      authorizationPage.getValidationErrorText('@loginField').should('eq', validationErrorText.login);
      cy.get(authorizationPage.passwordField)
        .as('passwordField')
        .should('have.css', 'border-color', authorizationPage.invalidBorderColor);
      authorizationPage.getValidationErrorText('@passwordField').should('eq', validationErrorText.password);
    });

    for (const data of failedTestData) {
      it(`should be invalid login (DDT) [${data.login} : ${data.pass}]`, () => {
        cy.loginByWebForm(data.login, data.pass);
        cy.get(authorizationPage.authorizationErrorElement).should('have.text', validationErrorText.authorization);
      });
    }
  });
});
