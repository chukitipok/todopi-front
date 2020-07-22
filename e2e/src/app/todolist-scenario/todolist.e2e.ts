import { TodolistPage } from './todolist.po';
import { browser, logging, element, by } from 'protractor';
import { exception } from 'console';
import { protractor } from 'protractor/built/ptor';

describe('Register full scenario', () => {
    let page: TodolistPage;

    beforeEach(async () => {
        page = new TodolistPage();
        await page.navigateTo();
    });

    describe('User without a todolist', () => {
        it("Should display create todolist div if user does not have a todolist", () => {

        })
    })
});
