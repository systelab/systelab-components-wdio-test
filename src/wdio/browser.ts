import * as tmp from "tmp";
import * as fs from "fs";

import { AutomationEnvironment } from "./automation-environment.util";
import { LocatorType } from "./locator";
import { ElementArrayFinder, ElementFinder } from "./element-finder";
import { DefaultTimeout } from "./default-timeout";
import { Constants } from "../constants";


export class Browser {

    // Navigation
    public static async navigateToURL(url: string): Promise<void> {
        await AutomationEnvironment.getWorkingBrowser().url(url);
    }


    // Keyboard
    public static async pressEsc(): Promise<void> {
        return AutomationEnvironment.getWorkingBrowser().keys(['Escape']);
    }

    public static async pressTab(): Promise<void> {
        return AutomationEnvironment.getWorkingBrowser().keys(['Tab']);
    }

    public static async pressBackspace(): Promise<void> {
        return AutomationEnvironment.getWorkingBrowser().keys(['Backspace']);
    }

    public static async pressEnter(): Promise<void> {
        return AutomationEnvironment.getWorkingBrowser().keys(['Enter']);
    }

    public static async pressDelete(): Promise<void> {
        return AutomationEnvironment.getWorkingBrowser().keys(['Delete']);
    }
    
    public static async writeText(stringToWrite: string): Promise<void> {
        await AutomationEnvironment.getWorkingBrowser().keys(stringToWrite.split(''));
    }
    

    // Search single element
    public static byId(id: string): ElementFinder {
        return new ElementFinder({type: LocatorType.ElementSelector, selector: `#${id}`});
    }

    public static byTagName(tagName: string): ElementFinder {
        return new ElementFinder({type: LocatorType.ElementSelector, selector: `<${tagName}>`});
    }

    public static byClassName(className: string): ElementFinder {
        return new ElementFinder({type: LocatorType.ElementSelector, selector: `.${className}`});
    }

    public static byCSS(cssExpression: string): ElementFinder {
        return new ElementFinder({type: LocatorType.ElementSelector, selector: cssExpression});
    }

    public static byButtonText(text: string): ElementFinder {
        return this.byElementText('button', text);
    }

    public static byElementText(tagName: string, text: string): ElementFinder {
        return new ElementFinder( {type: LocatorType.ElementSelector, selector: `${tagName}*=${text}`});
    }

    public static bySystelabTestId(systelabTestId: string): ElementFinder {
        return new ElementFinder({type: LocatorType.ElementSelector, selector: `[${Constants.SYSTELAB_TEST_ID_ATTRIBUTE}="${systelabTestId}"]`});
    }



    // Search list of elements
    public static allByTagName(tagName: string): ElementArrayFinder {
        return new ElementArrayFinder({type: LocatorType.ArraySelector, selector: `<${tagName}>`});
    }

    public static allByClassName(className: string): ElementArrayFinder {
        return new ElementArrayFinder({type: LocatorType.ArraySelector, selector: `.${className}`});
    }

    public static allByCSS(cssExpression: string): ElementArrayFinder {
        return new ElementArrayFinder({type: LocatorType.ArraySelector, selector: cssExpression});
    }

    public static allBySystelabTestId(systelabTestId: string): ElementArrayFinder {
        return new ElementArrayFinder({type: LocatorType.ArraySelector, selector: `[${Constants.SYSTELAB_TEST_ID_ATTRIBUTE}="${systelabTestId}"]`});
    }


    // Flow control
    public static async sleep(duration: number): Promise<void> {
        await AutomationEnvironment.getWorkingBrowser().pause(duration);
    }

    public static async waitUntil(condition: () => boolean | Promise<boolean>, timeout: number = DefaultTimeout.SLOW_WAIT): Promise<void> {
        await AutomationEnvironment.getWorkingBrowser().waitUntil(condition, {timeout});
    }


    // Screenshots
    public static async takeScreenshot(): Promise<string> {
        const tempFilepath = tmp.tmpNameSync({postfix: '.png'});
        const screenshotBuffer: Buffer = await AutomationEnvironment.getWorkingBrowser().saveScreenshot(tempFilepath);
        fs.unlinkSync(tempFilepath);
        return screenshotBuffer.toString('base64');
    }

    public static async saveScreenshot(filepath: string): Promise<void> {
        await AutomationEnvironment.getWorkingBrowser().saveScreenshot(filepath);
    }

    // Capabilities and Status
    public static getName(): string {
        const caps = AutomationEnvironment.getWorkingBrowser().capabilities as any;
        return caps.browserName;
    }

    public static getVersion(): string {
        const caps = AutomationEnvironment.getWorkingBrowser().capabilities as any;
        return caps.browserVersion;
    }

    public static getOperatingSystem(): string {
        const caps = AutomationEnvironment.getWorkingBrowser().capabilities as any;
        return caps.platformName;
    }

    // Window
    public static async getWindowSize(): Promise<{ width: number, height: number }> {
        return await AutomationEnvironment.getWorkingBrowser().getWindowSize() as { width: number; height: number };
    }

    public static async setWindowSize(width: number, height: number): Promise<void> {
        await AutomationEnvironment.getWorkingBrowser().setWindowSize(width, height);
    }

    public static async setFullscreen(): Promise<void> {
        await AutomationEnvironment.getWorkingBrowser().fullscreenWindow();
    }
}
