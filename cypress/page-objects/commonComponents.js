/// <reference types="cypress" />

class CommonComponents {

  get siteErrorComponent() { return '.site-error'; }
  get logo() { return '.navbar-brand'; }
  get homeLink() { return `a[href="/"]:not(${this.logo})`; }
  get registrationLink() { return 'a[href="/registration"]'; }
  get loginLink() { return 'a[href="/login"]'; }
  get userMenu() { return '#dropdownUser'; }

  isPageErrorNotPresent() {
    cy.get(this.siteErrorComponent).should('not.exist');
  }

  goToHomePageViaLogo() {
    cy.get(this.logo)
      .should('be.visible')
      .click();
  }

  goToHomePageViaLink() {
    cy.get(this.homeLink)
      .should('be.visible')
      .click();
  }

  goToRegistrationPage() {
    cy.get(this.registrationLink)
      .should('be.visible')
      .click();
  }

  goToAuthorizationPage() {
    cy.get(this.loginLink)
      .should('be.visible')
      .click();
  }

  checkUserLogin(username) {
    cy.get(this.userMenu).should('have.text', username);
  }
}

export default new CommonComponents();
