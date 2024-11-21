import fs from "fs";
import {Locator, RemoteApplication} from "../../wdio/index.js";
import {HttpStatus} from "../server/http-status.js";


export class ElementFinderRemote {
  constructor(protected remoteApplication: RemoteApplication, protected locators: Locator[]) {
  }

  public getLocators(): Locator[] {
    return this.locators;
  }


  // Queries
  public async isPresent(): Promise<boolean> {
    const response = await this.executeEndpoint('POST', 'element/query/present', {locators: this.locators});
    const body = await response.json();
    return body.isPresent;
  }

  public async isDisplayed(): Promise<boolean> {
    const response = await this.executeEndpoint('POST', 'element/query/displayed', {locators: this.locators});
    const body = await response.json();
    return body.isDisplayed;
  }

  public async isClickable(): Promise<boolean> {
    const response = await this.executeEndpoint('POST', 'element/query/clickable', {locators: this.locators});
    const body = await response.json();
    return body.isClickable;
  }

  public async isEnabled(): Promise<boolean> {
    const response = await this.executeEndpoint('POST', 'element/query/enabled', {locators: this.locators});
    const body = await response.json();
    return body.isEnabled;
  }

  public async isSelected(): Promise<boolean> {
    const response = await this.executeEndpoint('POST', 'element/query/selected', {locators: this.locators});
    const body = await response.json();
    return body.isSelected;
  }

  public async isFocused(): Promise<boolean> {
    const response = await this.executeEndpoint('POST', 'element/query/focused', {locators: this.locators});
    const body = await response.json();
    return body.isFocused;
  }

  public async getText(): Promise<string> {
    const response = await this.executeEndpoint('POST', 'element/query/text', {locators: this.locators});
    const body = await response.json();
    return body.text;
  }

  public async getValue(): Promise<string> {
    const response = await this.executeEndpoint('POST', 'element/query/value', {locators: this.locators});
    const body = await response.json();
    return body.value;
  }

  public async getHTML(includeSelectorTag: boolean): Promise<string> {
    const response = await this.executeEndpoint('POST', 'element/query/html', {
      locators: this.locators,
      includeSelectorTag
    });
    const body = await response.json();
    return body.html;
  }

  public async getAttribute(name: string): Promise<string> {
    const response = await this.executeEndpoint('POST', 'element/query/attribute', {locators: this.locators, name});
    const body = await response.json();
    return body.attribute;
  }

  public async getCSSProperty(name: string): Promise<string> {
    const response = await this.executeEndpoint('POST', 'element/query/css-property', {locators: this.locators, name});
    const body = await response.json();
    return body.property;
  }

  public async getProperty(name: string): Promise<any> {
    const response = await this.executeEndpoint('POST', 'element/query/property', {locators: this.locators, name});
    const body = await response.json();
    return body.property;
  }

  public async getBoundingRect(): Promise<{ x: number, y: number, width: number, height: number }> {
    const response = await this.executeEndpoint('POST', 'element/query/bounding-rect', {locators: this.locators});
    const body = await response.json();
    return body.boundingRect;
  }

  public async getPosition(): Promise<{ x: number, y: number }> {
    const response = await this.executeEndpoint('POST', 'element/query/position', {locators: this.locators});
    const body = await response.json();
    return body.position;
  }

  public async getSize(): Promise<{ width: number, height: number }> {
    const response = await this.executeEndpoint('POST', 'element/query/size', {locators: this.locators});
    const body = await response.json();
    return body.size;
  }


  // Actions
  public async click(): Promise<void> {
    await this.executeEndpoint('POST', 'element/action/click', {locators: this.locators});
  }

  public async moveTo(): Promise<void> {
    await this.executeEndpoint('POST', 'element/action/move-to', {locators: this.locators});
  }

  public async clear(): Promise<void> {
    await this.executeEndpoint('POST', 'element/action/clear', {locators: this.locators});
  }

  public async write(text: string): Promise<void> {
    await this.executeEndpoint('POST', 'element/action/write', {locators: this.locators, text});
  }

  public async tap(): Promise<void> {
    await this.executeEndpoint('POST', 'element/action/tap', {locators: this.locators});
  }


  // Condition waits
  public async waitToBePresent(timeout: number = 500): Promise<void> {
    await this.executeEndpoint('POST', 'element/wait/present', {locators: this.locators});
  }

  public async waitToBeDisplayed(timeout: number = 500): Promise<void> {
    await this.executeEndpoint('POST', 'element/wait/displayed', {locators: this.locators});
  }

  public async waitToBeClickable(timeout: number = 500): Promise<void> {
    await this.executeEndpoint('POST', 'element/wait/clickable', {locators: this.locators});
  }

  public async waitToBeEnabled(timeout: number = 500): Promise<void> {
    await this.executeEndpoint('POST', 'element/wait/enabled', {locators: this.locators});
  }

  public async waitUntil(condition: () => boolean | Promise<boolean>, timeout: number = 5000): Promise<void> {
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      try{
        const satisfied: boolean = await condition();
        if (satisfied) {
          return;
        }
      } catch (err){
      }      
    }
    throw new Error('Timeout: condition not satisfied');
  }


  // Screenshots
  public async takeScreenshot(): Promise<string> {
    const response = await this.executeEndpoint('POST', 'element/screenshot', {locators: this.locators});
    const body = await response.json();
    return body.screenshot;
  }

  public async saveScreenshot(filepath: string): Promise<void> {
    const screenshot = await this.takeScreenshot();
    const base64Data = screenshot.replace(/^data:image\/png;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(filepath, buffer);
  }


  // Count (for arrays)
  public async count(): Promise<number> {
    const response = await this.executeEndpoint('POST', 'element/count', {locators: this.locators});
    const body = await response.json();
    return body.count;
  }

  // Auxiliary methods
  private async executeEndpoint(method: string, route: string, body: object): Promise<any> {

    const hostname = this.remoteApplication.host.name;
    const port = this.remoteApplication.host.port;
    const apiPrefix = this.remoteApplication.host.apiPrefix;
    const applicationId = this.remoteApplication.remoteId;
    const baseURL = `http://${hostname}:${port}/${apiPrefix}/applications/${applicationId}`;
    const endpointURL = `${baseURL}/${route}`;
    const response: Response = await fetch(endpointURL, {
      method,
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(body),
    });

    if (response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
      const errorMessage: string = (response.body as any).error as string;
      throw new Error('Error: ' + errorMessage);
    }
    
    return response;
  }
}
