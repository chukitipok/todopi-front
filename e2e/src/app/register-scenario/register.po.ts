import { browser, by, element, ElementFinder, ElementArrayFinder } from 'protractor';

export class RegisterPage {
    navigateTo(): Promise<unknown> {
        return browser.get(browser.baseUrl + '/register') as Promise<unknown>;
    }

    getEmail(): ElementFinder {
        return element(by.id('email'));
    }

    getFirstname(): ElementFinder {
        return element(by.id('firstname'));
    }

    getLastname(): ElementFinder {
        return element(by.id('lastname'));
    }

    getBirthdate(): ElementFinder {
        return element(by.id('birthdate'));
    }

    getPassword(): ElementFinder {
        return element(by.id('password'));
    }

    getSubmitButton(): ElementFinder {
        return element(by.id('register-submit'));
    }

    getCurrentUrl(): Promise<string> {
        return browser.getCurrentUrl() as Promise<string>;
    }

    getFirstnameErrorMessage(): ElementFinder {
        return element(by.id('firstname-error'));
    }

    getLastnameErrorMessage(): ElementFinder {
        return element(by.id('lastname-error'));
    }

    getBirthdateErrorMessage(): ElementFinder {
        return element(by.id('birthdate-error'));
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

    async getAllFirstnameErrorsMessages(): Promise<ElementArrayFinder> {
        return await element.all(by.id('firstname-error'));
    }

    async getAllLastnameErrorsMessages(): Promise<ElementArrayFinder> {
        return await element.all(by.id('lastname-error'));
    }

    async getAllBirthdateErrorsMessages(): Promise<ElementArrayFinder> {
        return await element.all(by.id('birthdate-error'));
    }

}