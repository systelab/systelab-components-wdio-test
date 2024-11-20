import * as tmp from "tmp";
import * as fs from "fs";

import { AutomationEnvironment } from "./automation-environment.js";
import { LocatorType } from "./locator.js";
import { ElementArrayFinder, ElementFinder } from "./element-finder.js";
import { DefaultTimeout } from "./default-timeout.js";
import { Constants } from "../constants.js";
import { BrowserRemote } from "../remote/client/browser-remote.js";


export class Browser {

    // Navigation
    public static async navigateToURL(url: string): Promise<void> {
        if (AutomationEnvironment.isLocalMode()) {
            await AutomationEnvironment.getWorkingBrowser().url(url);
        } else {
            await BrowserRemote.navigateToURL(url);
        }
    }


    // Keyboard
    public static async pressEsc(): Promise<void> {
        if (AutomationEnvironment.isLocalMode()) {
            return AutomationEnvironment.getWorkingBrowser().keys(['Escape']);
        } else {
            return BrowserRemote.pressEsc();
        }
    }

    public static async pressTab(): Promise<void> {
        if (AutomationEnvironment.isLocalMode()) {
            return AutomationEnvironment.getWorkingBrowser().keys(['Tab']);
        } else {
            return BrowserRemote.pressTab();
        }
    }

    public static async pressBackspace(): Promise<void> {
        if (AutomationEnvironment.isLocalMode()) {
            return AutomationEnvironment.getWorkingBrowser().keys(['Backspace']);
        } else {
            return BrowserRemote.pressBackspace();
        }
    }

    public static async pressEnter(): Promise<void> {
        if (AutomationEnvironment.isLocalMode()) {
            return AutomationEnvironment.getWorkingBrowser().keys(['Enter']);
        } else {
            return BrowserRemote.pressEnter();
        }
    }

    public static async pressDelete(): Promise<void> {
        if (AutomationEnvironment.isLocalMode()) {
            return AutomationEnvironment.getWorkingBrowser().keys(['Delete']);
        } else {
            return BrowserRemote.pressDelete();
        }
    }
    
    public static async writeText(stringToWrite: string): Promise<void> {
        if (AutomationEnvironment.isLocalMode()) {
            return AutomationEnvironment.getWorkingBrowser().keys(stringToWrite.split(''));
        } else {
            return BrowserRemote.writeText(stringToWrite);
        }
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
        if (AutomationEnvironment.isLocalMode()) {
            await AutomationEnvironment.getWorkingBrowser().waitUntil(condition, {timeout});
        } else {
            await BrowserRemote.waitUntil(condition, timeout);
        }
    }


    // Screenshots
    public static async takeScreenshot(): Promise<string> {
        if (AutomationEnvironment.isLocalMode()) {
            const tempFilepath = tmp.tmpNameSync({postfix: '.png'});
            const screenshotBuffer: Buffer = await AutomationEnvironment.getWorkingBrowser().saveScreenshot(tempFilepath);
            fs.unlinkSync(tempFilepath);
            return screenshotBuffer.toString('base64');
        } else {
            return BrowserRemote.takeScreenshot();
        }
    }

    public static async saveScreenshot(filepath: string): Promise<void> {
        if (AutomationEnvironment.isLocalMode()) {
            await AutomationEnvironment.getWorkingBrowser().saveScreenshot(filepath);
        } else {
            await BrowserRemote.saveScreenshot(filepath);
        }
    }


    // Capabilities and Status
    public static async getName(): Promise<string> {
        if (AutomationEnvironment.isLocalMode()) {
            const caps = AutomationEnvironment.getWorkingBrowser().capabilities as any;
            return caps.browserName;
        } else {
            return BrowserRemote.getName();
        }
    }

    public static async getVersion(): Promise<string> {
        if (AutomationEnvironment.isLocalMode()) {
            const caps = AutomationEnvironment.getWorkingBrowser().capabilities as any;
            return caps.browserVersion;
        } else {
            return BrowserRemote.getVersion();
        }
    }

    public static async getOperatingSystem(): Promise<string> {
        if (AutomationEnvironment.isLocalMode()) {
            const caps = AutomationEnvironment.getWorkingBrowser().capabilities as any;
            return caps.platformName;
        } else {
            return BrowserRemote.getOperatingSystem();
        }
    }


    // Window
    public static async getWindowSize(): Promise<{ width: number, height: number }> {
        if (AutomationEnvironment.isLocalMode()) {
            return await AutomationEnvironment.getWorkingBrowser().getWindowSize() as { width: number; height: number };
        } else {
            return BrowserRemote.getWindowSize();
        }
    }

    public static async setWindowSize(width: number, height: number): Promise<void> {
        if (AutomationEnvironment.isLocalMode()) {
            await AutomationEnvironment.getWorkingBrowser().setWindowSize(width, height);
        } else {
            await BrowserRemote.setWindowSize(width, height);
        }
    }

    public static async setFullscreen(): Promise<void> {
        if (AutomationEnvironment.isLocalMode()) {
            await AutomationEnvironment.getWorkingBrowser().fullscreenWindow();
        } else {
            await BrowserRemote.setFullscreen();
        }
    }
}
