import { RegisterPage } from './register.po';
import { browser, logging, element, by } from 'protractor';
import { exception } from 'console';
import { protractor } from 'protractor/built/ptor';
import { LoginPage } from '../login-scenario/login.po';

describe('Register full scenario', () => {
    let page: RegisterPage;
    let loginPage: LoginPage;
    let tooShortPassword: string = 'shorty'

    beforeEach(async () => {
        page = new RegisterPage();
        loginPage = new LoginPage();
        await page.navigateTo();
    });

    describe("Register tryings possibilies", () => {
        it('should not change page if register is failed', async () => {
            page.getEmail().sendKeys('toto@toto.fr');
            page.getFirstname().sendKeys('jojo');
            page.getLastname().sendKeys('jojo');
            page.getBirthdate().sendKeys('08-09-1993');
            page.getPassword().sendKeys(tooShortPassword);
            page.getSubmitButton().click();

            expect(await page.getCurrentUrl()).toBe(browser.baseUrl + 'register');
        });

        it('should not register if age is under 13 years', async () => {
            page.getEmail().sendKeys('toto@toto.fr');
            page.getFirstname().sendKeys('jojo');
            page.getLastname().sendKeys('jojo');
            page.getBirthdate().sendKeys('08-09-2020');
            page.getPassword().sendKeys('longpasswordwelove!');
            page.getSubmitButton().click();

            expect(await page.getCurrentUrl()).toBe(browser.baseUrl + 'register');
        });

        it('should not register if password is under 8 chars', async () => {
            page.getEmail().sendKeys('toto@toto.fr');
            page.getFirstname().sendKeys('jojo');
            page.getLastname().sendKeys('jojo');
            page.getBirthdate().sendKeys('08-09-2020');
            page.getPassword().sendKeys(tooShortPassword);
            page.getSubmitButton().click();

            expect(await page.getCurrentUrl()).toBe(browser.baseUrl + 'register');
        });

        it('should register if all case are meet', async () => {
            page.getEmail().sendKeys('toto@toto.fr');
            page.getFirstname().sendKeys('jojo');
            page.getLastname().sendKeys('jojo');
            page.getBirthdate().sendKeys('08-09-1993');
            page.getPassword().sendKeys('longAndVeryGoodPassword');
            page.getSubmitButton().click();

            expect(await page.getCurrentUrl()).toBe(browser.baseUrl + 'login');
        });

        it('should redirect if register is met', async () => {
            page.getEmail().sendKeys('toto@tota.fr');
            page.getFirstname().sendKeys('jojo');
            page.getLastname().sendKeys('jojo');
            page.getBirthdate().sendKeys('08-09-1993');
            page.getPassword().sendKeys('longAndVeryGoodPassword');
            page.getSubmitButton().click();

            expect(await page.getCurrentUrl()).toBe(browser.baseUrl + 'login');
        });

        it('should not redirect if user already exist ', async () => {
            page.getEmail().sendKeys('toto@tota.fr');
            page.getFirstname().sendKeys('jojo');
            page.getLastname().sendKeys('jojo');
            page.getBirthdate().sendKeys('08-09-1993');
            page.getPassword().sendKeys('longAndVeryGoodPassword');
            page.getSubmitButton().click();

            expect(await page.getCurrentUrl()).toBe(browser.baseUrl + 'register');
        });
    });

    describe("error messages", () => {
        it('should display error message if firstname is not valid', () => {
            page.getFirstname().click();
            page.getPassword().click();

            expect(page.getFirstnameErrorMessage().isDisplayed()).toBe(true);
        });

        it('should display error message if lastname is not valid', () => {
            page.getLastname().click();
            page.getPassword().click();

            expect(page.getLastnameErrorMessage().isDisplayed()).toBe(true);
        });

        it('should display error message if email is not valid', () => {
            page.getEmail().click();
            page.getPassword().click();

            expect(page.getEmailErrorMessage().isDisplayed()).toBe(true);
        });

        it('should display error message if password is not valid', () => {
            page.getPassword().click();
            page.getEmail().click();

            expect(page.getPasswordErrorMessage().isDisplayed()).toBe(true);
        });

        it('should not display error message if firstname is valid', async () => {
            page.getFirstname().click();
            page.getFirstname().sendKeys('jesuisunfirstname');
            page.getPassword().click();

            expect((await page.getAllFirstnameErrorsMessages()).length).toBe(0);
        });

        it('should not display error message if lastname is valid', async () => {
            page.getLastname().click();
            page.getLastname().sendKeys('jesuisunlastname');
            page.getPassword().click();

            expect((await page.getAllLastnameErrorsMessages()).length).toBe(0);
        });

        it('should not display error message if email is valid', async () => {
            page.getEmail().click();
            page.getEmail().sendKeys('jesuisunemail');
            page.getPassword().click();

            expect((await page.getAllEmailErrorsMessages()).length).toBe(0);
        });

        it('should not display error message if password is valid', async () => {
            page.getPassword().click();
            page.getPassword().sendKeys('jesuisunpassword');
            page.getEmail().click();

            expect((await page.getAllPasswordErrorsMessages()).length).toBe(0);
        });
    });

    describe("Register to login scenario", () => {
        it('should register user then allow to connect on this same very user', async () => {
            const email = 'toto@tuti.fr'
            const password = 'longAndVeryGoodPassword'
            page.getEmail().sendKeys(email);
            page.getFirstname().sendKeys('jojo');
            page.getLastname().sendKeys('jojo');
            page.getBirthdate().sendKeys('08-09-1993');
            page.getPassword().sendKeys(password);
            page.getSubmitButton().click();

            expect(await page.getCurrentUrl()).toBe(browser.baseUrl + 'login');

            loginPage.getEmail().sendKeys(email);
            loginPage.getPassword().sendKeys(password);
            loginPage.getSubmitButton().click();

            expect(await page.getCurrentUrl()).toBe(browser.baseUrl + 'todolist');
        });
    });
});
