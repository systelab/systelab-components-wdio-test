import {AutomationEnvironment, Browser, BrowserType, RemoteApplication, RemoteApplicationManager} from '../../src';
import {ComponentsPage} from '../pages/components.po';

describe('Remote application test', () => {
  // Manually start the remote-application-server ( npm run start-remote-test-server) in a separate terminal
  let application: RemoteApplication;
  beforeAll(async () => {
    application = await RemoteApplicationManager.start(
      {
        name: "localhost",
        port: 3333,
        apiPrefix: 'wdio'
      },
      BrowserType.Chrome, {
        "capabilities": {
          "browserName": "chrome",
          "goog:chromeOptions": {
            "args": [
              "--no-sandbox",
              "--disable-search-engine-choice-screen",
              "--start-fullscreen"
            ]
          }
        }
      });
    AutomationEnvironment.setRemoteApplication(application)
  });

  afterAll(async () => {
    await RemoteApplicationManager.stop(application.id);
  })

  it('Open systelab components page', async () => {
    await Browser.navigateToURL('https://systelab.github.io/components');
    await ComponentsPage.get().getFormShowcaseSection().waitToBeDisplayed(2000);
    await Browser.saveScreenshot('test/systelab-page.png');
    await ComponentsPage.get().getFormShowcaseSection().getInputForm().saveScreenshot('test/input-form.png');

    expect(await ComponentsPage.get().getFormShowcaseSection().isDisplayed()).toBeTruthy();
    expect(await ComponentsPage.get().getFormShowcaseSection().getInputForm().getDisabledInput().isDisabled()).toBeTruthy();
  });

  it('Fill some input boxes', async () => {
    await ComponentsPage.get().getFormShowcaseSection().getInputForm().getFullWidth().setText("Systelab Test");
    await ComponentsPage.get().getFormShowcaseSection().getInputForm().getNumberInput().setText("1234");

    expect(await ComponentsPage.get().getFormShowcaseSection().getInputForm().getFullWidth().getText()).toEqual("Systelab Test");
    expect(await ComponentsPage.get().getFormShowcaseSection().getInputForm().getNumberInput().getText()).toEqual("1234");
  });

  it('Click on modals', async () => {
    await ComponentsPage.get().getNavigationBar().getModals().click();
    await ComponentsPage.get().getModalsShowcaseSection().getToast().waitToBeDisplayed(2000);

    expect(await ComponentsPage.get().getModalsShowcaseSection().getToast().isDisplayed()).toBeTruthy();
  });

  it('Click on Error Toast', async () => {
    await ComponentsPage.get().getModalsShowcaseSection().getToast().getError().click();
    await ComponentsPage.get().getToastPopup().waitToBeDisplayed(1000);

    expect(await ComponentsPage.get().getToastPopup().isDisplayed()).toBeTruthy();
  });

});
