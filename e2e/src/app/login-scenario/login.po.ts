import {browser, by, element, ElementFinder, ElementArrayFinder} from 'protractor';

export class LoginPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl + '/login') as Promise<unknown>;
  }

  getEmail(): ElementFinder {
    return element(by.id('email'));
  }

  getPassword(): ElementFinder {
    return element(by.id('password'));
  }

  getSubmitButton(): ElementFinder {
    return element(by.id('login-submit'));
  }

  getCurrentUrl(): Promise<string> {
    return browser.getCurrentUrl() as Promise<string>;
  }

  getEmailErrorMessage(): ElementFinder {
    return element(by.id('email-error'));
  }

  getPasswordErrorMessage(): ElementFinder {
    return element(by.id('password-error'));
  }

  async getAllEmailErrorsMessages(): Promise<ElementArrayFinder> {
    return await element.all(by.id('email-error'));
  }

  async getAllPasswordErrorsMessages(): Promise<ElementArrayFinder> {
    return await element.all(by.id('password-error'));
  }
}
