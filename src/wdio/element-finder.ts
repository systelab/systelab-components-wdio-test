import { ElementArray } from "webdriverio";
import { Locator, LocatorType } from "./locator";
import * as tmp from "tmp";
import fs from "fs";
import { Constants } from "../constants";
import { AutomationEnvironment, BrowserType } from "./automation-environment";


export class ElementFinder {
    constructor(protected locator: Locator, protected parent: ElementFinder | ElementArrayFinder | null = null) {
    }

    public getLocator(): Locator {
        return this.locator;
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
        return (await this.findElement()).isExisting();
    }

    public async isDisplayed(): Promise<boolean> {
        return (await this.findElement()).isDisplayed();
    }

    public async isClickable(): Promise<boolean> {
        return (await this.findElement()).isClickable();
    }

    public async isEnabled(): Promise<boolean> {
        return (await this.findElement()).isEnabled();
    }

    public async isSelected(): Promise<boolean> {
        return (await this.findElement()).isSelected();
    }

    public async isFocused(): Promise<boolean> {
        return (await this.findElement()).isFocused();
    }

    public async getText(): Promise<string> {
        return (await this.findElement()).getText();
    }

    public async getValue(): Promise<string> {
        return (await this.findElement()).getValue();
    }

    public async getHTML(includeSelectorTag: boolean): Promise<string> {
        return (await this.findElement()).getHTML(includeSelectorTag);
    }

    public async getAttribute(name: string): Promise<string> {
        return (await this.findElement()).getAttribute(name);
    }

    public async getCSSProperty(name: string): Promise<string> {
        return (await (await this.findElement()).getCSSProperty(name)).value as string;
    }

    public async getProperty(name: string): Promise<any> {
        return (await this.findElement()).getProperty(name);
    }

    public async getBoundingRect(): Promise<{ x: number, y: number, width: number, height: number }> {
        const position = await this.getPosition();
        const size = await this.getSize();
        return { ...position, ...size };
    }

    public async getPosition(): Promise<{ x: number, y: number }> {
        return (await this.findElement()).getLocation();
    }

    public async getSize(): Promise<{ width: number, height: number }> {
        return (await this.findElement()).getSize();
    }


    // Actions
    public async click(): Promise<void> {
        const element: WebdriverIO.Element = await this.findElement();
        if (AutomationEnvironment.getBrowserType() === BrowserType.TauriApp) {
            return AutomationEnvironment.getWorkingBrowser().execute('arguments[0].click()', element);
        } else {
            return element.click();
        }
    }

    public async moveTo(): Promise<void> {
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
    }

    public async clear(): Promise<void> {
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
    }

    public async write(text: string): Promise<void> {
        const element: WebdriverIO.Element = await this.findElement();
        if (AutomationEnvironment.getBrowserType() === BrowserType.TauriApp) {
            return AutomationEnvironment.getWorkingBrowser().execute(`
                const el = arguments[0];
                el.value="${text}";
                el.dispatchEvent(new Event("input", { bubbles: true }));
            `, element);
        } else {
            return element.setValue(text);
        }
    }

    public async tap(): Promise<void> {
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
    }


    // Condition waits
    public async waitToBePresent(timeout: number = 500): Promise<void> {
        const element: WebdriverIO.Element = await this.findElement();
        await this.waitUntil(() => element.isExisting(), timeout);
    }

    public async waitToBeDisplayed(timeout: number = 500): Promise<void> {
        const element: WebdriverIO.Element = await this.findElement();
        await this.waitUntil(() => element.isDisplayed(), timeout);
    }

    public async waitToBeClickable(timeout: number = 500): Promise<void> {
        const element: WebdriverIO.Element = await this.findElement();
        await this.waitUntil(() => element.isClickable(), timeout);
    }

    public async waitToBeEnabled(timeout: number = 500): Promise<void> {
        const element: WebdriverIO.Element = await this.findElement();
        await this.waitUntil(() => element.isEnabled(), timeout);
    }

    public async waitUntil(condition: () => boolean | Promise<boolean>, timeout: number = 5000): Promise<void> {
        await AutomationEnvironment.getWorkingBrowser().waitUntil(condition, {timeout});
    }


    // Screenshots
    public async takeScreenshot(): Promise<string> {
        const tempFilepath = tmp.tmpNameSync({postfix: '.png'});
        const screenshotBuffer: Buffer = await (await this.findElement()).saveScreenshot(tempFilepath);
        fs.unlinkSync(tempFilepath);
        return screenshotBuffer.toString('base64');
    }

    public async saveScreenshot(filepath: string): Promise<void> {
        await (await this.findElement()).saveScreenshot(filepath);
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
}

export class ElementArrayFinder {
    constructor(protected locator: Locator, protected parent: ElementFinder | null = null) {
    }

    public getLocator(): Locator {
        return this.locator;
    }

    public get(index: number): ElementFinder {
        return new ElementFinder({type: LocatorType.ArrayItem, index}, this);
    }

    public async count(): Promise<number> {
        return (await this.findElements()).length;
    }

    public async findElements(): Promise<ElementArray> {
        if (this.parent) {
            return (await (await this.parent.findElement()).$$(this.locator.selector as string));
        } else {
            return AutomationEnvironment.getWorkingBrowser().$$(this.locator.selector as string);
        }
    }
}
