**Примечание**
_[@cypress/xpath](https://www.npmjs.com/package/cypress-xpath) has been [deprecated](https://github.com/cypress-io/cypress/tree/develop/npm/xpath) and is no longer supported._</br>

Пример использования XPath для формы регистрации
```
it('should be able all elements', () => {
    cy.xpath('//input[@placeholder="Введите имя"]').should('be.visible');
    cy.xpath('//input[@placeholder="Введите email"]').should('be.visible');
    cy.xpath('//input[@id="inputPassword"]').should('be.visible');
    cy.xpath('//button[text()="Зарегистрировать"]').should('be.visible');
  });
```
XPath показан здесь для примера, в тестах используются CSS селекторы из-за прекращения поддержки @cypress/xpath.

**Запуск тестов**
- установить зависимости `npm i`</br>
- если cypress ранее не был установлен, тогда запустится процесс установки</br>
- для запуска GUI cypress `npm run cy:open`</br>
- для запуска CLI cypress `npm run cy:run`</br>

После `npm run cy:run` результаты можно посмотреть [cloud.cypress.io](https://cloud.cypress.io/projects/8crqv7)
