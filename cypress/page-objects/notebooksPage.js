/// <reference types="cypress" />

import { parseNumber } from '../support/helpers/parseNumber';

class NotebooksPage {

  get basketContainer() { return '#basketContainer'; }
  get basketTotalCounts() { return `${this.basketContainer} .basket-count-items`; }
  get basketTotalPrice() { return `${this.basketContainer} .basket_price`; }
  get basketDropdownMenu() { return '.dropdown-menu.show'; }
  get basketItem() { return '.basket-item'; } // может быть больше 1
  get basketItemTitle() { return '.basket-item-title'; } // может быть больше 1
  get basketItemPrice() { return '.basket-item-price'; } // может быть больше 1
  get openBasketButton() { return 'a[href="/basket"]'; }
  get notebookItems() { return '.note-item'; } // больше 1
  get notebookItemsWithDiscount() { return `${this.notebookItems}.hasDiscount`; } // больше 1
  get notebookItemsWithoutDiscount() { return `${this.notebookItems}:not(.hasDiscount)`; } // больше 1
  get notebookItemCountGroup() { return '.input-group'; } // может быть больше 1
  get notebookItemCountFieldToFill() { return 'input[name="product-enter-count"]'; } // может быть больше 1
  get notebookItemTotalCount() { return '.product_count'; } // может быть больше 1
  get notebookBuyButton() { return '.actionBuyProduct'; } // может быть больше 1


  isReady() {
    cy.get(this.notebookItems).should('be.visible');
  }

  /**
   * Раскрытие popup окна корзины в шапке сайта
   */
  openBasketContainerInHeader() {
    cy.get(this.basketContainer).click();
    cy.get(this.basketDropdownMenu).should('be.visible');
  }

  /**
   * Поиск  и добавление в корзину
   * @param {selector} items - селектор для поиска карточек товаров
   * @param {string} name - наименование карточки товара `необязательный аргумент`
   */
  addItemInBasket(items, name) {
    cy.get(items).then(items => {
      if (name) {
        cy.wrap(items)
          .contains(name)
          .siblings(this.notebookBuyButton)
          .click();
      } else {
        cy.wrap(items)
          .first()
          .find(this.notebookBuyButton)
          .click();
      }
    });
  }

  /**
   * Выбор элемента из списка товаров по его номеру и добавления этого товара в корзину
   * @param {number} num - порядковый номер элемента начиная с 0
   */
  getItemSelectorByNumberAndAddToBasket(num) {
    cy.get(this.notebookItems)
      .eq(num)
      .find(this.notebookBuyButton)
      .click();
  }

  /**
   * Получаем `_csrf` токен, осуществляем запрос на добавление продукта в корзину через API с добавление токена
   * @param {number} productId - идентификатор продукта
   */
  addOneItemInBasketByAPI(productId, count = 1) {
    cy.getCsrfToken().then(token => {
      cy.request({
        method: 'POST',
        url: Cypress.env('CREATE_BASKET_URL'),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-CSRF-Token': token
        },
        body: {
          product: productId,
          count: count
        }
      }).then((res) => {
        expect(res.status).equal(200);
      });
    });
  }

  /**
 * Поиск подходящего товара и ввод количества, добавление в корзину
 * @param {selector} items - селектор товаров
 * @param {number} count - количество товара
 */
  addItemToBasketWithCount(items, count) {
    let found = false;

    cy.get(items)
      .then(items => {
        items.each((index, item) => {
          if (found) {
            return false;
          }
          const $cardProductElement = Cypress.$(item);
          const totalCount = $cardProductElement.children().find(this.notebookItemTotalCount);
          if (parseNumber(totalCount.text()) >= count) {
            found = true;
            return cy.wrap($cardProductElement);
          } else {
            throw new Error(`Cannot find item with a quantity of ${count}`);
          }
        });
      })
      .within(() => {
        cy.get(this.notebookItemCountFieldToFill)
          .clear()
          .type(count);
        cy.get(this.notebookBuyButton)
          .click();
      });
  }

  /**
  * Проверка общего количества товаров в корзине
  * @param {number} number - ожидаемое количество товаров в корзине
  */
  checkTotalItemsInBasket(number) {
    cy.get(this.basketTotalCounts).should('have.text', number);
  }

  /**(для дополнительного теста)
   * Получение всех наименований и проверка наличия добавленного товара в корзине
   * @param {string} name - наименование товара 
   */
  checkItemInBasketWithItemName(name) {
    cy.get(this.basketItemTitle)
      .contains(name)
      .should('have.text', name)
      .siblings(this.basketItemPrice)
      .invoke('text')
      .then(text => {
        cy.wrap(parseNumber(text)).should('be.a', 'number');
      });
  }

  /**
  * Проверка наличия товара в корзине
  */
  checkItemsInBasket() {
    cy.get(this.basketItemTitle)
      .as('items')
      .each(item => expect(item.text()).to.be.a('string'));
    cy.get('@items')
      .each(item => {
        cy.wrap(item)
          .siblings(this.basketItemPrice)
          .invoke('text')
          .then(text => expect(parseNumber(text)).to.be.a('number'));
      });
  }

  /**
  * Проверка общей стоимости товаров в корзине
  */
  checkTotalPriceInBasket() {
    cy.wait(500);
    let total = 0;
    cy.get(this.basketItemPrice)
      .should('be.visible')
      .each(itemPrice => {
        total += parseNumber(itemPrice.text());
      });
    cy.get(this.basketTotalPrice).should(totalPrice => expect(parseNumber(totalPrice.text()), 'Total price').to.equal(total));
  }

  /**
   * Переход на страницу корзины
   */
  goToBasketPage() {
    cy.get(this.openBasketButton)
      .should('be.visible')
      .click();
  }

  /**
   * Очиста корзины
   */
  clearBasket() {
    cy.request('POST', Cypress.env('CLEAR_BASKET_URL'));
    cy.request('POST', Cypress.env('GET_BASKET_URL'))
      .its('body.basketCount')
      .should('eq', 0);
  }
}

export default new NotebooksPage();
