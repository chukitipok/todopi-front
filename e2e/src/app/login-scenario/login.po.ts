import {browser, by, element, ElementFinder} from 'protractor';

export class LoginPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl + '/login') as Promise<unknown>;
  }

  async getEmail(): Promise<ElementFinder> {
    return element(by.id('email'));
  }

  async getPassword(): Promise<ElementFinder> {
    return element(by.id('password'));
  }

  async getSubmitButton(): Promise<ElementFinder> {
    return element(by.id('login-submit'));
  }

  async getCurrentUrl(): Promise<string> {
    return browser.getCurrentUrl();
  }
}
