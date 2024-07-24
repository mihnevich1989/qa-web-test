/// <reference types="cypress" />

import notebooksPage from '../../page-objects/notebooksPage';
import commonComponents from '../../page-objects/commonComponents';
import notebookFixture from '../../fixtures/notebook_page.json';

const CART_QUANTITY = 9;
const TOTAL_ITEMS_IN_CART = 1;
const PRODUCT_ID = 10;
const TOTAL_ITEMS_TO_ADD_TO_BASKET = 7;
const OVER_NINE_COUNT = 10;

describe('Notebooks', () => {

  beforeEach(() => {
    cy.loginByAPI();
    notebooksPage.clearBasket();
    cy.visit('/');
    notebooksPage.isReady();
  });

  // eslint-disable-next-line array-bracket-newline, array-element-newline, object-curly-spacing
  it('should expand the empty basket, and navigate to the basket page', { tags: ['@testCase', '@smoke'] }, () => {
    cy.on('uncaught:exception', (err, runnable) => {
      expect(err.message).to.not.include('showToast is not defined');
      return false;
    });
    cy.get(notebooksPage.notebookItems).should('be.visible');
    notebooksPage.openBasketContainerInHeader();
    notebooksPage.goToBasketPage();
    commonComponents.isPageErrorNotPresent();
  });

  it('should add 1 item without discount, expand the basket, and navigate to the basket page', { tags: '@testCase' }, () => {
    notebooksPage.addItemInBasket(notebooksPage.notebookItemsWithoutDiscount);
    notebooksPage.checkTotalItemsInBasket(TOTAL_ITEMS_IN_CART);
    notebooksPage.openBasketContainerInHeader();
    notebooksPage.checkItemsInBasket();
    notebooksPage.checkTotalPriceInBasket();
    notebooksPage.goToBasketPage();
    commonComponents.isPageErrorNotPresent();
  });

  it('should add 1 discounted item, expand the basket, and navigate to the basket page', { tags: '@testCase' }, () => {
    notebooksPage.addItemInBasket(notebooksPage.notebookItemsWithDiscount);
    notebooksPage.checkTotalItemsInBasket(TOTAL_ITEMS_IN_CART);
    notebooksPage.openBasketContainerInHeader();
    notebooksPage.checkItemsInBasket();
    notebooksPage.checkTotalPriceInBasket();
    notebooksPage.goToBasketPage();
    commonComponents.isPageErrorNotPresent();
  });

  it('should add 9 different items, expand the basket, and navigate to the basket page', { tags: '@testCase' }, () => {
    notebooksPage.addOneItemInBasketByAPI(PRODUCT_ID);
    for (let i = 0; i <= TOTAL_ITEMS_TO_ADD_TO_BASKET; i++) {
      notebooksPage.getItemSelectorByNumberAndAddToBasket(i);
    }
    notebooksPage.checkTotalItemsInBasket(CART_QUANTITY);
    notebooksPage.openBasketContainerInHeader();
    for (let i = 0; i < CART_QUANTITY; i++) {
      notebooksPage.checkItemsInBasket();
    }
    notebooksPage.goToBasketPage();
    commonComponents.isPageErrorNotPresent();
  });

  it('should add 9 discounted items with the same name, expand the basket, and navigate to the basket page', { tags: '@testCase' }, () => {
    notebooksPage.addItemToBasketWithCount(notebooksPage.notebookItemsWithDiscount, CART_QUANTITY);
    notebooksPage.checkTotalItemsInBasket(CART_QUANTITY);
    notebooksPage.openBasketContainerInHeader();
    notebooksPage.checkTotalPriceInBasket();
    notebooksPage.goToBasketPage();
    commonComponents.isPageErrorNotPresent();
  });

  // extra test for example
  it('should add 2 items without discount, expand the basket, and check items and sum', () => {
    notebooksPage.addItemInBasket(notebooksPage.notebookItemsWithoutDiscount);
    notebooksPage.addItemInBasket(notebooksPage.notebookItemsWithoutDiscount, notebookFixture.name); //for example add item with naming
    notebooksPage.checkTotalItemsInBasket(2);
    notebooksPage.openBasketContainerInHeader();
    notebooksPage.checkItemsInBasket();
    notebooksPage.checkItemInBasketWithItemName(notebookFixture.name); // for example assertion by name
    notebooksPage.checkTotalPriceInBasket();
  });

  // extra test for example
  it('should contain 10 items in basket with correct total price', () => {
    for (let i = 1; i <= OVER_NINE_COUNT; i++) {
      notebooksPage.addOneItemInBasketByAPI(i);
    }
    cy.reload();
    notebooksPage.checkTotalItemsInBasket(OVER_NINE_COUNT);
    notebooksPage.openBasketContainerInHeader();
    notebooksPage.checkTotalPriceInBasket();
  });
});
