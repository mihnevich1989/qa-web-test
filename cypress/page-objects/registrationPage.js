/// <reference types="cypress" />

class RegistrationPage {

  constructor() {
    this.VALID_BORDER_COLOR = 'rgb(40, 167, 69)';
    this.INVALID_BORDER_COLOR = 'rgb(220, 53, 69)';
  }

  get nameField() { return '#inputName'; }
  get emailField() { return '#inputEmail'; }
  get passwordField() { return '#inputPassword'; }
  get submitButton() { return 'button[type="submit"]'; }
  get errorValidationElement() { return '.invalid-feedback'; }

  /** 
   * Ввод имени
   * @param {string} name - обязательно для заполнения
   * @return возвращает элемент
   */
  fillNameField(name) {
    return cy.get(this.nameField).type(name);
  }

  /** 
   * Ввод емайл
   * @param {string} email - обязательно для заполнения
   * @return возвращает элемент
   */
  fillEmailField(email) {
    return cy.get(this.emailField).type(email);
  }

  /**
   * Ввод пароля
   * @param {string} password - обязательно для заполнения
   * @return возвращает элемент
   */
  fillPasswordField(password) {
    return cy.get(this.passwordField).type(password);
  }

  submit() {
    return cy.get(this.submitButton).click();
  }

  /**
   * Поиск соседнего элемента с текстом валидации по отношению к `element` и получение текста из него
   * @param {element} element - обязательно для заполнения
   * @returns текст
   */
  getValidationErrorText(element) {
    return cy.get(element)
      .siblings(this.errorValidationElement)
      .invoke('text')
      .normalizeText();
  }
}

export default new RegistrationPage();
