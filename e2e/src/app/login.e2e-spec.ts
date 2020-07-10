import {browser, by, element} from 'protractor';

describe('Login scenario', () => {

  it('should not log the user', () => {
    browser.get(browser.baseUrl);
    const emailInput = element(by.id('email'));
    const passwordInput = element(by.id('password'));
    const submitButton = element(by.id('password'));
    emailInput.sendKeys('toto@toto.fr');
    passwordInput.sendKeys('login-submit');
    submitButton.click();
    expect(browser.getCurrentUrl()).toBe(browser.baseUrl);
  });
});
