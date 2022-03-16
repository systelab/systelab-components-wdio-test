import { ElementArrayFinder, ElementFinder } from "../wdio";


export class Widget {

    constructor(protected elem: ElementFinder) {
    }

    public getElement(): ElementFinder {
        return this.elem;
    }

    public async isPresent(): Promise<boolean> {
        return this.elem.isPresent();
    }

    public async isDisplayed(): Promise<boolean> {
        return this.elem.isDisplayed();
    }

    public async isClickable(): Promise<boolean> {
        return this.elem.isClickable();
    }

    public async isEnabled(): Promise<boolean> {
        return this.elem.isEnabled();
    }

    public async isDisabled(): Promise<boolean> {
        return !(await this.elem.isEnabled());
    }

    public byId(id: string): ElementFinder {
        return this.elem.byId(id);
    }

    public byTagName(tagName: string): ElementFinder {
        return this.elem.byTagName(tagName);
    }

    public byClassName(className: string): ElementFinder {
        return this.elem.byClassName(className);
    }

    public byCSS(cssExpression: string): ElementFinder {
        return this.elem.byCSS(cssExpression);
    }

    public byButtonText(text: string): ElementFinder {
        return this.elem.byButtonText(text);
    }

    public byElementText(tagName: string, text: string): ElementFinder {
        return this.elem.byElementText(tagName, text);
    }

    public allByTagName(tagName: string): ElementArrayFinder {
        return this.elem.allByTagName(tagName);
    }

    public allByClassName(className: string): ElementArrayFinder {
        return this.elem.allByClassName(className);
    }

    public allByCSS(cssExpression: string): ElementArrayFinder {
        return this.elem.allByCSS(cssExpression);
    }

    public async waitToBePresent(timeout: number = 500): Promise<void> {
        return this.elem.waitToBePresent(timeout);
    }

    public async waitToBeNotPresent(timeout: number = 500): Promise<void> {
        return this.elem.waitUntil(async () => !(await this.isPresent()), timeout);
    }

    public async waitToBeDisplayed(timeout: number = 500): Promise<void> {
        return this.elem.waitToBeDisplayed(timeout);
    }

    public async waitToBeNotDisplayed(timeout: number = 500): Promise<void> {
        return this.elem.waitUntil(async () => !(await this.isDisplayed()), timeout);
    }

    public async waitToBeClickable(timeout: number = 500): Promise<void> {
        return this.elem.waitToBeClickable(timeout);
    }

    public async waitToBeNotClickable(timeout: number = 500): Promise<void> {
        return this.elem.waitUntil(async () => !(await this.isClickable()), timeout);
    }

    public async waitToBeEnabled(timeout: number = 500): Promise<void> {
        return this.elem.waitToBeEnabled(timeout);
    }

    public async waitToBeDisabled(timeout: number = 500): Promise<void> {
        return this.elem.waitUntil(async () => !(await this.isEnabled()), timeout);
    }

    public async waitUntil(condition: () => boolean | Promise<boolean>, timeout: number = 5000): Promise<void> {
        return this.elem.waitUntil(condition, timeout);
    }
}
