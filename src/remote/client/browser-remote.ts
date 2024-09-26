import {AutomationEnvironment, RemoteApplication} from "../../wdio";
import {HttpStatus} from "../server/http-status";
import fs from "fs";

export class BrowserRemote {

  // Navigation
  public static async navigateToURL(url: string): Promise<void> {
    await this.executeEndpoint('POST', 'navigate', {url});
  }


  // Keyboard
  public static async pressEsc(): Promise<void> {
    await this.executeEndpoint('POST', 'keyboard/escape');
  }

  public static async pressTab(): Promise<void> {
    await this.executeEndpoint('POST', 'keyboard/tab');
  }

  public static async pressBackspace(): Promise<void> {
    await this.executeEndpoint('POST', 'keyboard/backspace');
  }

  public static async pressEnter(): Promise<void> {
    await this.executeEndpoint('POST', 'keyboard/enter');
  }

  public static async pressDelete(): Promise<void> {
    await this.executeEndpoint('POST', 'keyboard/delete');
  }

  public static async writeText(stringToWrite: string): Promise<void> {
    await this.executeEndpoint('POST', 'keyboard/text', {stringToWrite});
  }


  // Flow control
  public static async waitUntil(condition: () => boolean | Promise<boolean>, timeout: number): Promise<void> {
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      const satisfied: boolean = await condition();
      if (satisfied) {
        return;
      }
    }
    throw new Error('Timeout: condition not satisfied');
  }

  // Screenshots
  public static async takeScreenshot(): Promise<string> {
    const response = await this.executeEndpoint('POST', 'screenshot');
    const body = await response.json();
    return body.screenshot;
  }

  public static async saveScreenshot(filepath: string): Promise<void> {
    const screenshot = await this.takeScreenshot();
    const base64Data = screenshot.replace(/^data:image\/png;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(filepath, buffer);
  }

  // Capabilities and Status
  public static async getName(): Promise<string> {
    const response = await this.executeEndpoint('GET', 'name');
    const body = await response.json();
    return body.name;
  }

  public static async getVersion(): Promise<string> {
    const response = await this.executeEndpoint('GET', 'version');
    const body = await response.json();
    return body.version;
  }

  public static async getOperatingSystem(): Promise<string> {
    const response = await this.executeEndpoint('GET', 'os');
    const body = await response.json();
    return body.os;
  }


  // Window
  public static async getWindowSize(): Promise<{ width: number, height: number }> {
    const response = await this.executeEndpoint('GET', 'size');
    const body = await response.json();
    return body;
  }

  public static async setWindowSize(width: number, height: number): Promise<void> {
    await this.executeEndpoint('POST', 'window/size', {width, height});
  }

  public static async setFullscreen(): Promise<void> {
    await this.executeEndpoint('POST', 'window/fullscreen');
  }


  // Auxiliary methods
  private static async executeEndpoint(method: string, route: string, body: object = {}): Promise<any> {
    const remoteApplication: RemoteApplication = AutomationEnvironment.getWorkingRemoteApplication();

    const hostname = remoteApplication.host.name;
    const port = remoteApplication.host.port;
    const apiPrefix = remoteApplication.host.apiPrefix;
    const applicationId = remoteApplication.remoteId;
    const baseURL = `http://${hostname}:${port}/${apiPrefix}/applications/${applicationId}`;
    const endpointURL = `${baseURL}/${route}`;

    let response: Response;
    if (method === 'POST') {
      response = await fetch(endpointURL, {
        method,
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(body),
      });
    } else {
      response = await fetch(endpointURL, {
        method,
        headers: {'content-type': 'application/json'},
      });
    }
    if (response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
      const errorMessage: string = (response.body as any).error as string;
      throw new Error('Error: ' + errorMessage);
    }
    return response;
  }
}
