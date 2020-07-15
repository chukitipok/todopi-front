import { LoginPage } from './login.po';
import { browser, logging, element, by } from 'protractor';
import { exception } from 'console';
import { protractor } from 'protractor/built/ptor';

describe('Login full scenario', () => {
  let page: LoginPage;

  beforeEach(async () => {
    page = new LoginPage();
    await page.navigateTo();
  });

  it('should not login if user does not exist', async () => {
    page.getEmail().sendKeys('toto@toto.fr');
    page.getPassword().sendKeys('toto@toto.fr');
    page.getSubmitButton().click();

    expect(await page.getCurrentUrl()).toBe(browser.baseUrl + 'login');
  });

  describe('Login Button clickable', () => {
    it('should not enable Login button if email is not filled', () => {
      page.getPassword().sendKeys('FakePassword');

      expect(page.getSubmitButton().isEnabled()).toBe(false);
    });

    it('should not enable Login button if password is not filled', () => {
      page.getEmail().sendKeys('toto@toto.fr');

      expect(page.getSubmitButton().isEnabled()).toBe(false);
    });

    it('should enable Login button if both field are filled', () => {
      page.getEmail().sendKeys('toto@toto.fr');
      page.getPassword().sendKeys('toto@toto.fr');

      expect(page.getSubmitButton().isEnabled()).toBe(true);
    });
  });

  describe("error messages", () => {
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

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
