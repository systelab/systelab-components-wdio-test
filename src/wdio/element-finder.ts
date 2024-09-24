import {ElementArray} from "webdriverio";
import * as tmp from "tmp";
import fs from "fs";

import {Locator, LocatorType} from "./locator";
import {AutomationEnvironment, BrowserType} from "./automation-environment";
import {Constants} from "../constants";
import {ElementFinderRemote} from "../remote/client/element-finder-remote";
import {RemoteApplication} from "./application-manager-remote";


export class ElementFinder {
  constructor(protected locator: Locator, protected parent: ElementFinder | ElementArrayFinder | null = null) {
  }

  public getLocator(): Locator {
    return this.locator;
  }

  public getLocatorsChain(): Locator[] {
    let locators: Locator[] = [];
    if (this.parent) {
      locators = this.parent.getLocatorsChain();
    }

    locators.push(this.locator);
    return locators;
  }


  // Search single element
  public byId(id: string): ElementFinder {
    return new ElementFinder({type: LocatorType.ElementSelector, selector: `#${id}`}, this);
  }

  public byTagName(tagName: string): ElementFinder {
    return new ElementFinder({type: LocatorType.ElementSelector, selector: `<${tagName}>`}, this);
  }

  public byClassName(className: string): ElementFinder {
    return new ElementFinder({type: LocatorType.ElementSelector, selector: `.${className}`}, this);
  }

  public byCSS(cssExpression: string): ElementFinder {
    return new ElementFinder({type: LocatorType.ElementSelector, selector: cssExpression}, this);
  }

  public byButtonText(text: string): ElementFinder {
    return this.byElementText('button', text);
  }

  public byElementText(tagName: string, text: string): ElementFinder {
    return new ElementFinder({type: LocatorType.ElementSelector, selector: `${tagName}*=${text}`}, this);
  }

  public bySystelabTestId(systelabTestId: string): ElementFinder {
    return new ElementFinder({
      type: LocatorType.ElementSelector,
      selector: `[${Constants.SYSTELAB_TEST_ID_ATTRIBUTE}='${systelabTestId}']`
    }, this);
  }


  // Search list of elements
  public allByTagName(tagName: string): ElementArrayFinder {
    return new ElementArrayFinder({type: LocatorType.ArraySelector, selector: `<${tagName}>`}, this);
  }

  public allByClassName(className: string): ElementArrayFinder {
    return new ElementArrayFinder({type: LocatorType.ArraySelector, selector: `.${className}`}, this);
  }

  public allByCSS(cssExpression: string): ElementArrayFinder {
    return new ElementArrayFinder({type: LocatorType.ArraySelector, selector: cssExpression}, this);
  }

  public allBySystelabTestId(systelabTestId: string): ElementArrayFinder {
    return new ElementArrayFinder({
      type: LocatorType.ArraySelector,
      selector: `[${Constants.SYSTELAB_TEST_ID_ATTRIBUTE}='${systelabTestId}']`
    }, this);
  }


  // Queries
  public async isPresent(): Promise<boolean> {
    if (AutomationEnvironment.isLocalMode()) {
      return (await this.findElement()).isExisting();
    } else {
      return this.findRemoteElement().isPresent();
    }
  }

  public async isDisplayed(): Promise<boolean> {
    if (AutomationEnvironment.isLocalMode()) {
      return (await this.findElement()).isDisplayed();
    } else {
      return this.findRemoteElement().isDisplayed();
    }
  }

  public async isClickable(): Promise<boolean> {
    if (AutomationEnvironment.isLocalMode()) {
      return (await this.findElement()).isClickable();
    } else {
      return this.findRemoteElement().isClickable();
    }
  }

  public async isEnabled(): Promise<boolean> {
    if (AutomationEnvironment.isLocalMode()) {
      return (await this.findElement()).isEnabled();
    } else {
      return this.findRemoteElement().isEnabled();
    }
  }

  public async isSelected(): Promise<boolean> {
    if (AutomationEnvironment.isLocalMode()) {
      return (await this.findElement()).isSelected();
    } else {
      return this.findRemoteElement().isSelected();
    }
  }

  public async isFocused(): Promise<boolean> {
    if (AutomationEnvironment.isLocalMode()) {
      return (await this.findElement()).isFocused();
    } else {
      return this.findRemoteElement().isFocused();
    }
  }

  public async getText(): Promise<string> {
    if (AutomationEnvironment.isLocalMode()) {
      const browserType: BrowserType = AutomationEnvironment.getBrowserType();
      if (browserType === BrowserType.TauriApp || browserType === BrowserType.WebKitGTK) {
        return (await this.findElement()).getHTML(false);
      } else {
        return (await this.findElement()).getText();
      }
    } else {
      return this.findRemoteElement().getText();
    }
  }

  public async getValue(): Promise<string> {
    if (AutomationEnvironment.isLocalMode()) {
      return (await this.findElement()).getValue();
    } else {
      return this.findRemoteElement().getValue();
    }
  }

  public async getHTML(includeSelectorTag: boolean): Promise<string> {
    if (AutomationEnvironment.isLocalMode()) {
      return (await this.findElement()).getHTML(includeSelectorTag);
    } else {
      return this.findRemoteElement().getHTML(includeSelectorTag);
    }
  }

  public async getAttribute(name: string): Promise<string> {
    if (AutomationEnvironment.isLocalMode()) {
      return (await this.findElement()).getAttribute(name);
    } else {
      return this.findRemoteElement().getAttribute(name);
    }
  }

  public async getCSSProperty(name: string): Promise<string> {
    if (AutomationEnvironment.isLocalMode()) {
      return (await (await this.findElement()).getCSSProperty(name)).value as string;
    } else {
      return this.findRemoteElement().getCSSProperty(name);
    }
  }

  public async getProperty(name: string): Promise<any> {
    if (AutomationEnvironment.isLocalMode()) {
      return (await this.findElement()).getProperty(name);
    } else {
      return this.findRemoteElement().getProperty(name);
    }
  }

  public async getBoundingRect(): Promise<{ x: number, y: number, width: number, height: number }> {
    if (AutomationEnvironment.isLocalMode()) {
      const position = await this.getPosition();
      const size = await this.getSize();
      return {...position, ...size};
    } else {
      return this.findRemoteElement().getBoundingRect();
    }
  }

  public async getPosition(): Promise<{ x: number, y: number }> {
    if (AutomationEnvironment.isLocalMode()) {
      return (await this.findElement()).getLocation();
    } else {
      return this.findRemoteElement().getPosition();
    }
  }

  public async getSize(): Promise<{ width: number, height: number }> {
    if (AutomationEnvironment.isLocalMode()) {
      return (await this.findElement()).getSize();
    } else {
      return this.findRemoteElement().getSize();
    }
  }


  // Actions
  public async click(): Promise<void> {
    if (AutomationEnvironment.isLocalMode()) {
      const element: WebdriverIO.Element = await this.findElement();
      if (AutomationEnvironment.getBrowserType() === BrowserType.TauriApp) {
        return AutomationEnvironment.getWorkingBrowser().execute('arguments[0].click()', element);
      } else {
        return element.click();
      }
    } else {
      return this.findRemoteElement().click();
    }
  }

  public async moveTo(): Promise<void> {
    if (AutomationEnvironment.isLocalMode()) {
      const element: WebdriverIO.Element = await this.findElement();
      if (AutomationEnvironment.getBrowserType() === BrowserType.TauriApp) {
        return AutomationEnvironment.getWorkingBrowser().execute(`
                    const el = arguments[0];
                    const rect = el.getBoundingClientRect();
                    const x = rect.left + (rect.width / 2);
                    const y = rect.top + (rect.height / 2);

                    const mouseMove = new MouseEvent('mousemove', {
                        view: window,
                        bubbles: true,
                        cancelable: true,
                        clientX: x,
                        clientY: y
                    });

                    const mouseOver = new MouseEvent('mouseover', {
                        view: window,
                        bubbles: true,
                        cancelable: true,
                        clientX: x,
                        clientY: y
                    });

                    el.dispatchEvent(mouseMove);
                    el.dispatchEvent(mouseOver);
                `, element);
      } else {
        return element.moveTo();
      }
    } else {
      return this.findRemoteElement().moveTo();
    }
  }

  public async clear(): Promise<void> {
    if (AutomationEnvironment.isLocalMode()) {
      const element: WebdriverIO.Element = await this.findElement();
      if (AutomationEnvironment.getBrowserType() === BrowserType.TauriApp) {
        return AutomationEnvironment.getWorkingBrowser().execute(`
                    const el = arguments[0];
                    el.value="";
                    el.dispatchEvent(new Event("input", { bubbles: true }));
                `, element);
      } else {
        return element.clearValue();
      }
    } else {
      return this.findRemoteElement().clear();
    }
  }

  public async write(text: string): Promise<void> {
    if (AutomationEnvironment.isLocalMode()) {
      const element: WebdriverIO.Element = await this.findElement();
      if (AutomationEnvironment.getBrowserType() === BrowserType.TauriApp) {
        return AutomationEnvironment.getWorkingBrowser().execute((element, newValue) => {
          element.value = newValue;
          element.dispatchEvent(new Event("input", {bubbles: true}));
          element.dispatchEvent(new KeyboardEvent("keyup", {bubbles: true}));
        }, element as any, text);
      } else {
        return element.setValue(text);
      }
    } else {
      return this.findRemoteElement().write(text);
    }
  }

  public async tap(): Promise<void> {
    if (AutomationEnvironment.isLocalMode()) {
      const element = await this.findElement() as any;
      await AutomationEnvironment.getWorkingBrowser().execute((element) => {
        const touchPoint = new Touch({
          identifier: Date.now(),
          target: element,
          clientX: 0,
          clientY: 0,
          pageX: 0,
          pageY: 0,
          screenX: 0,
          screenY: 0
        });

        const touchStartEvent = new TouchEvent('touchstart', {
          cancelable: true,
          bubbles: true,
          touches: [touchPoint],
          targetTouches: [],
          changedTouches: [touchPoint]
        });
        element.dispatchEvent(touchStartEvent);

        const touchEndEvent = new TouchEvent('touchend', {
          cancelable: true,
          bubbles: true,
          touches: [touchPoint],
          targetTouches: [],
          changedTouches: [touchPoint]
        });
        element.dispatchEvent(touchEndEvent);
      }, element);
    } else {
      return this.findRemoteElement().tap();
    }
  }


  // Condition waits
  public async waitToBePresent(timeout: number = 500): Promise<void> {
    if (AutomationEnvironment.isLocalMode()) {
      await (await this.findElement()).waitForExist({timeout});
    } else {
      await this.findRemoteElement().waitToBePresent(timeout);
    }
  }

  public async waitToBeDisplayed(timeout: number = 500): Promise<void> {
    if (AutomationEnvironment.isLocalMode()) {
      await (await this.findElement()).waitForDisplayed({timeout});
    } else {
      await this.findRemoteElement().waitToBeDisplayed(timeout);
    }
  }

  public async waitToBeClickable(timeout: number = 500): Promise<void> {
    if (AutomationEnvironment.isLocalMode()) {
      await (await this.findElement()).waitForClickable({timeout});
    } else {
      await this.findRemoteElement().waitToBeClickable(timeout);
    }
  }

  public async waitToBeEnabled(timeout: number = 500): Promise<void> {
    if (AutomationEnvironment.isLocalMode()) {
      await (await this.findElement()).waitForEnabled({timeout});
    } else {
      await this.findRemoteElement().waitToBeEnabled(timeout);
    }
  }

  public async waitUntil(condition: () => boolean | Promise<boolean>, timeout: number = 5000): Promise<void> {
    if (AutomationEnvironment.isLocalMode()) {
      await (await this.findElement()).waitUntil(condition, {timeout});
    } else {
      await this.findRemoteElement().waitUntil(condition, timeout);
    }
  }


  // Screenshots
  public async takeScreenshot(): Promise<string> {
    if (AutomationEnvironment.isLocalMode()) {
      const tempFilepath = tmp.tmpNameSync({postfix: '.png'});
      const screenshotBuffer: Buffer = await (await this.findElement()).saveScreenshot(tempFilepath);
      fs.unlinkSync(tempFilepath);
      return screenshotBuffer.toString('base64');
    } else {
      return this.findRemoteElement().takeScreenshot();
    }
  }

  public async saveScreenshot(filepath: string): Promise<void> {
    if (AutomationEnvironment.isLocalMode()) {
      await (await this.findElement()).saveScreenshot(filepath);
    } else {
      return this.findRemoteElement().saveScreenshot(filepath);
    }
  }


  // Auxiliary methods
  public async findElement(): Promise<WebdriverIO.Element> {
    if (this.parent) {
      if (this.parent.getLocator().type == LocatorType.ElementSelector ||
        this.parent.getLocator().type == LocatorType.ArrayItem) {
        return await (await (this.parent as ElementFinder).findElement()).$(this.locator.selector as string);
      } else if (this.parent.getLocator().type == LocatorType.ArraySelector) {
        return (await (this.parent as ElementArrayFinder).findElements())[this.locator.index as number];
      } else {
        throw 'Unsupported locator type for parent item: ' + this.parent.getLocator().type;
      }
    } else {
      return AutomationEnvironment.getWorkingBrowser().$(this.locator.selector as string);
    }
  }

  private findRemoteElement(): ElementFinderRemote {
    const locators: Locator[] = this.getLocatorsChain();
    const remoteApplication: RemoteApplication = AutomationEnvironment.getWorkingRemoteApplication();
    return new ElementFinderRemote(remoteApplication, locators);
  }
}

export class ElementArrayFinder {
  constructor(protected locator: Locator, protected parent: ElementFinder | null = null) {
  }

  public getLocator(): Locator {
    return this.locator;
  }

  public getLocatorsChain(): Locator[] {
    let locators: Locator[] = [];
    if (this.parent) {
      locators = this.parent.getLocatorsChain();
    }

    locators.push(this.locator);
    return locators;
  }


  public get(index: number): ElementFinder {
    return new ElementFinder({type: LocatorType.ArrayItem, index}, this);
  }

  public async count(): Promise<number> {
    if (AutomationEnvironment.isLocalMode()) {
      return (await this.findElements()).length;
    } else {
      return this.findRemoteElement().count();
    }
  }

  public async findElements(): Promise<ElementArray> {
    if (this.parent) {
      return (await (await this.parent.findElement()).$$(this.locator.selector as string));
    } else {
      return AutomationEnvironment.getWorkingBrowser().$$(this.locator.selector as string);
    }
  }

  private findRemoteElement(): ElementFinderRemote {
    const locators: Locator[] = this.getLocatorsChain();
    const remoteApplication: RemoteApplication = AutomationEnvironment.getWorkingRemoteApplication();
    return new ElementFinderRemote(remoteApplication, locators);
  }
}

export class ElementFinderBuilder {

  public static build(locators: Locator[]): ElementFinder | ElementArrayFinder | null {
    if (locators.length === 0) {
      return null;
    }

    const parent: ElementFinder | ElementArrayFinder | null = ElementFinderBuilder.build(locators.slice(0, locators.length - 1));

    const lastLocator: Locator = locators[locators.length - 1];
    if (lastLocator.type === LocatorType.ElementSelector || lastLocator.type === LocatorType.ArrayItem) {
      return new ElementFinder(lastLocator, parent);
    } else if (lastLocator.type === LocatorType.ArraySelector) {
      return new ElementArrayFinder(lastLocator, parent as ElementFinder | null);
    } else {
      throw 'Unsupported locator type: ' + lastLocator.type;
    }
  }
}
