/// <reference types="cypress" />

class CommonComponents {

  get siteErrorComponent() { return '.site-error'; }
  get logo() { return '.navbar-brand'; }
  get homeLink() { return `a[href="/"]:not(${this.logo})`; }
  get registrationLink() { return 'a[href="/registration"]'; }
  get loginLink() { return 'a[href="/login"]'; }
  get userMenu() { return '#dropdownUser'; }
}

export default new CommonComponents();
