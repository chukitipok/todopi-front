import { LoginPage } from './login.po';
import {browser, logging} from 'protractor';

describe('workspace-project App', () => {
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();
    page.navigateTo();
  });

  it('should not login if user does not exist', async () => {
    page.getEmail().sendKeys('toto@toto.fr');
    page.getPassword().sendKeys('toto@toto.fr');
    page.getSubmitButton().click();

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
