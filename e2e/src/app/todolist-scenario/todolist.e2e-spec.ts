import { TodolistPage } from './todolist.po';
import { browser, logging, element, by } from 'protractor';
import { exception } from 'console';
import { protractor } from 'protractor/built/ptor';
import { LoginPage } from '../login-scenario/login.po';

describe('Register full scenario', () => {
    let page: TodolistPage;
    let loginPage: LoginPage;

    beforeEach(async () => {
        page = new TodolistPage();
        loginPage = new LoginPage();
    });

    describe('User on login scenarios', () => {
        it('Should display create todolist div if user does not have a todolist', async () => {
            await page.navigateTo();

            expect(page.getNewTodolist().isDisplayed()).toBe(true);
        });

        it('Should not display add content div if user does not have a todolist', async () => {
            await page.navigateTo();

            expect((await page.getAllNewTodolistContent()).length).toBe(0);
        });

        it('Should display add content div if user have a todolist on login', async () => {
            await loginPage.navigateTo();

            expect(await page.getCurrentUrl()).toBe(browser.baseUrl + 'login');

            const email = 'toto@tuti.fr';
            const password = 'longAndVeryGoodPassword';
            loginPage.getEmail().sendKeys(email);
            loginPage.getPassword().sendKeys(password);
            loginPage.getSubmitButton().click();

            expect(await page.getCurrentUrl()).toBe(browser.baseUrl + 'todolist');

            expect((await page.getAllNewTodolistContent()).length).toBe(0);
        })

        it('should hide todolist creation div if user create todolist', async () => {
            await loginPage.navigateTo();

            expect(await page.getCurrentUrl()).toBe(browser.baseUrl + 'login');

            const email = 'toto@tuti.fr';
            const password = 'longAndVeryGoodPassword';
            loginPage.getEmail().sendKeys(email);
            loginPage.getPassword().sendKeys(password);
            loginPage.getSubmitButton().click();

            expect(await page.getCurrentUrl()).toBe(browser.baseUrl + 'todolist');

            expect((await page.getAllNewTodolist()).length).toBe(1);
        });
    });

    describe('User on create todolist', () => {
        it('should display add content and hide new todolist on todolist submit', async () => {
            await loginPage.navigateTo();

            expect(await page.getCurrentUrl()).toBe(browser.baseUrl + 'login');

            loginPage.getEmail().sendKeys('toto@toto.fr');
            loginPage.getPassword().sendKeys('longAndVeryGoodPassword');
            loginPage.getSubmitButton().click();

            expect(await page.getCurrentUrl()).toBe(browser.baseUrl + 'todolist');

            page.getTodolistCreationInput().sendKeys('new list !');

            page.getTodolistSubmitButton().click();

            expect((await page.getAllNewTodolist()).length).toBe(1);
            expect((await page.getAllNewTodolistContent()).length).toBe(0);
        });
    });
});
