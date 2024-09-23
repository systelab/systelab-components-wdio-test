import {
  AutomationEnvironment,
  Browser,
  BrowserType,
  ElementFinder,
  LocatorType,
  RemoteApplicationManager
} from '../../src/wdio';
import {RemoteApplication} from "../../lib";
import { spawn } from 'child_process';
import path from 'path';
import * as os from "os";
import * as Path from "path";

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
              "--disable-search-engine-choice-screen"
            ]
          }
        }
      });
    AutomationEnvironment.setRemoteApplication(application)
  });

  afterAll(async () => {
    await RemoteApplicationManager.stop(application.id);
  })

  it('Open werfen url', async () => {
    const titleElement: ElementFinder = new ElementFinder({
        type: LocatorType.ElementSelector,
        selector: 'h1.info-container__title'
      },
      new ElementFinder({type: LocatorType.ElementSelector, selector: '.carousel-inner'},
        new ElementFinder({type: LocatorType.ElementSelector, selector: '.row-main-info'})));
    await Browser.navigateToURL('https://werfen.com');
    // await titleElement.waitToBeDisplayed(20000);

    expect(await titleElement.getText()).toEqual('Powering Patient Care');
  });
});
