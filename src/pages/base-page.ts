import { Browser, DefaultTimeout, ElementArrayFinder, ElementFinder } from "../wdio";


export class BasePage {

    protected current: ElementFinder;

    constructor(private readonly tagName: string) {
        this.current = Browser.byTagName(tagName);
    }

    public getElementFinder(): ElementFinder {
        return this.current;
    }


    // Queries
    public async isPresent(): Promise<boolean> {
        return this.current.isPresent();
    }

    public async isDisplayed(): Promise<boolean> {
        return this.current.isDisplayed();
    }


    // Search by single element
    public byId(id: string): ElementFinder {
        return this.current.byId(id);
    }

    public byTagName(tagName: string): ElementFinder {
        return this.current.byTagName(tagName);
    }

    public byClassName(className: string): ElementFinder {
        return this.current.byClassName(className);
    }

    public byCSS(cssExpression: string): ElementFinder {
        return this.current.byCSS(cssExpression);
    }

    public byButtonText(text: string): ElementFinder {
        return this.current.byButtonText(text);
    }

    public byElementText(tagName: string, text: string): ElementFinder {
        return this.current.byElementText(tagName, text);
    }


    // Search list of elements
    public allByTagName(tagName: string): ElementArrayFinder {
        return this.current.allByTagName(tagName);
    }

    public allByClassName(className: string): ElementArrayFinder {
        return this.current.allByClassName(className);
    }

    public allByCSS(cssExpression: string): ElementArrayFinder {
        return this.current.allByCSS(cssExpression);
    }


    // Flow control
    public async waitToBePresent(timeout: number = DefaultTimeout.SLOW_WAIT): Promise<void> {
        return this.current.waitUntil(async () => await this.isPresent(), timeout);
    }

    public async waitToBeNotPresent(timeout: number = DefaultTimeout.SLOW_WAIT): Promise<void> {
        return this.current.waitUntil(async () => !(await this.isPresent()), timeout);
    }

    public async waitToBeDisplayed(timeout: number = DefaultTimeout.SLOW_WAIT): Promise<void> {
        return this.current.waitUntil(async () => await this.isDisplayed(), timeout);
    }

    public async waitToBeNotDisplayed(timeout: number = DefaultTimeout.SLOW_WAIT): Promise<void> {
        return this.current.waitUntil(async () => !(await this.isDisplayed()), timeout);
    }


    // Screenshots
    public async takeScreenshot(): Promise<string> {
        return this.current.takeScreenshot();
    }

    public async saveScreenshot(filepath: string): Promise<void> {
        return this.current.saveScreenshot(filepath);
    }
}
