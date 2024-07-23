/// <reference types="cypress" />

class AuthorizationPage {

  constructor() {
    this.VALID_BORDER_COLOR = 'rgb(40, 167, 69)';
    this.INVALID_BORDER_COLOR = 'rgb(220, 53, 69)';
  }

  get loginField() { return '#loginform-username'; }
  get passwordField() { return '#loginform-password'; }
  get submitButton() { return 'button[type="submit"]'; }
  get errorValidationElement() { return '.invalid-feedback'; }
  get authorizationErrorElement() { return '.error-password-feedback'; }

  /**
   * @param {string} login - ввод логина
   */
  fillLoginField(login) {
    return cy.get(this.loginField).type(login);
  }

  /**
   * @param {string} password - ввод пароля
   */
  fillPasswordField(password) {
    return cy.get(this.passwordField).type(password);
  }

  /**
   * Поиск соседнего элемента по отношению к `element` и извлечение текста из него
   * @param {element} element - селектор элемента
   * @returns текст
   */
  getValidationErrorText(element) {
    return cy.get(element)
      .siblings(this.errorValidationElement)
      .invoke('text')
      .normalizeText();
  }
}

export default new AuthorizationPage();
