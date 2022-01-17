import { LocatorType } from "./locator";
import { ElementFinder, ElementArrayFinder } from "./element-finder";

export class Browser {

    // Navigation
    public static async navigateToURL(url: string): Promise<void> {
        await browser.url(url);
    }


    // Keyboard special keys
    public static async pressTab(): Promise<void> {
        return browser.keys(['Tab']);
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


    // Search list of elements
    public static allByTagName(tagName: string): ElementArrayFinder {
        return new ElementArrayFinder({type: LocatorType.ArraySelector, selector: `<${tagName}>`});
    }

    public static allByClassName(className: string): ElementArrayFinder {
        return new ElementArrayFinder({type: LocatorType.ArraySelector, selector: `${className}`});
    }

    public static allByCSS(cssExpression: string): ElementArrayFinder {
        return new ElementArrayFinder({type: LocatorType.ArraySelector, selector: cssExpression});
    }


    // Condition waits
    public static async waitUntil(condition: () => boolean | Promise<boolean>, timeout: number = 5000): Promise<void> {
        await browser.waitUntil(condition, {timeout});
    }
}
