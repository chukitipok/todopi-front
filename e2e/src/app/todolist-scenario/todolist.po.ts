import { browser, by, element, ElementFinder, ElementArrayFinder } from 'protractor';

export class TodolistPage {
    navigateTo(): Promise<unknown> {
        return browser.get(browser.baseUrl + '/todolist') as Promise<unknown>;
    }

    
}
