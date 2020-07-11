import { LoginPage } from './login.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();
  });

  it('should not login if user does not exist', async () => {
    await page.navigateTo();
    const emailInput = await page.getEmail();
    const passwordInput = await page.getPassword();
    const submitButton = await page.getSubmitButton();
    emailInput.sendKeys('toto@toto.fr');
    passwordInput.sendKeys('toto@toto.fr');
    submitButton.click();
    expect(await page.getCurrentUrl()).toBe(browser.baseUrl + 'login');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
