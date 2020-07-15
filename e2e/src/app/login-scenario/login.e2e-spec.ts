import { LoginPage } from './login.po';
import { browser, logging } from 'protractor';

describe('Login full scenario', () => {
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();
  });

  it('should not login if user does not exist', async () => {
    await page.navigateTo();

    page.getEmail().sendKeys('toto@toto.fr');
    page.getPassword().sendKeys('toto@toto.fr');
    page.getSubmitButton().click();

    expect(await page.getCurrentUrl()).toBe(browser.baseUrl + 'login');
  });


  describe('Login Button clickable', () => {
    it('should not enable Login button if email is not filled', async () => {
      await page.navigateTo();

      page.getPassword().sendKeys('FakePassword');
      expect(page.getSubmitButton().isEnabled()).toBe(false);
    });

    it('should not enable Login button if password is not filled', async () => {
      await page.navigateTo();

      page.getEmail().sendKeys('toto@toto.fr');
      expect(page.getSubmitButton().isEnabled()).toBe(false);
    });

    it('should enable Login button if both field are filled', async () => {
      await page.navigateTo();

      page.getEmail().sendKeys('toto@toto.fr');
      page.getPassword().sendKeys('toto@toto.fr');

      expect(page.getSubmitButton().isEnabled()).toBe(true);
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
