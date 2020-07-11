import {browser, by, element, ElementFinder} from 'protractor';

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
}
