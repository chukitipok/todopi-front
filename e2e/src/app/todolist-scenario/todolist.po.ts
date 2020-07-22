import { browser, by, element, ElementFinder, ElementArrayFinder } from 'protractor';

export class TodolistPage {
    navigateTo(): Promise<unknown> {
        return browser.get(browser.baseUrl + '/todolist') as Promise<unknown>;
    }

    getCurrentUrl(): Promise<string> {
        return browser.getCurrentUrl() as Promise<string>;
    }

    getNewTodolist(): ElementFinder {
        return element(by.id('list-name'));
    }

    getTodolistCreationInput(): ElementFinder {
        return element(by.id('list-name'));
    }

    getTodolistSubmitButton(): ElementFinder {
        return element(by.id('submit-todolist'));
    }

    async getAllNewTodolist(): Promise<ElementArrayFinder> {
        return await element.all(by.id('new-todolist'));
    }

    async getAllNewTodolistContent(): Promise<ElementArrayFinder> {
        return await element.all(by.id('todolist-content'));
    }
}
