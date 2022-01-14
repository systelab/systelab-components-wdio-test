import { WebDriverIOElement, WebDriverIOElementArray } from "../types/wdio-element-type";


export class Widget {

    constructor(protected elem: WebDriverIOElement) {
    }

    public getElement(): WebDriverIOElement {
        return this.elem;
    }

    public async isPresent(): Promise<boolean> {
        return (await this.elem).isExisting();
    }

    public async isDisplayed(): Promise<boolean> {
        return (await this.elem).isDisplayed();
    }

    public async isEnabled(): Promise<boolean> {
        return (await this.elem).isEnabled();
    }

    public async isDisabled(): Promise<boolean> {
        return (await this.elem).isEnabled()
            .then(enabled => !enabled);
    }

    public byId(id: string): WebDriverIOElement {
        return this.elem.$(`#${id}`);
    }

    public byIdInsideElement(element: WebDriverIOElement, id: string): WebDriverIOElement {
        return element.$(`#${id}`);
    }

    public byTagName(tagName: string): WebDriverIOElement {
        return this.elem.$(`<${tagName}>`);
    }

    public byTagNameInsideElement(element: WebDriverIOElement, tagName: string): WebDriverIOElement {
        return element.$(`<${tagName}>`);
    }

    public byCSS(cssExpression: string): WebDriverIOElement {
        return this.elem.$(cssExpression);
    }

    public byCSSInsideElement(element: WebDriverIOElement, cssExpression: string): WebDriverIOElement {
        return element.$(cssExpression);
    }

    public byClassName(classNameExpression: string): WebDriverIOElement {
        return this.elem.$(`.${classNameExpression}`);
    }

    public byClassNameInsideElement(element: WebDriverIOElement, classNameExpression: string): WebDriverIOElement {
        return element.$(`.${classNameExpression}`);
    }

    public byButtonText(text: string): WebDriverIOElement {
        return this.byElementText("button", text);
    }

    public byButtonTextInsideElement(element: WebDriverIOElement, text: string): WebDriverIOElement {
        return this.byElementTextInsideElement(element, "button", text);
    }

    public byElementText(tagName: string, text: string): WebDriverIOElement {
        return this.elem.$(`${tagName}*=${text}`);
    }

    public byElementTextInsideElement(element: WebDriverIOElement, tagName: string, text: string): WebDriverIOElement {
        return element.$(`${tagName}*=${text}`);
    }

    public allById(id: string): WebDriverIOElementArray {
        return this.elem.$$(`#${id}`);
    }

    public allByIdInsideElement(element: WebDriverIOElement, id: string): WebDriverIOElementArray {
        return element.$$(`#${id}`);
    }

    public allByTagName(tagName: string): WebDriverIOElementArray {
        return this.elem.$$(`<${tagName}>`);
    }

    public allByTagNameInsideElement(element: WebDriverIOElement, tagName: string): WebDriverIOElementArray {
        return element.$$(`<${tagName}>`);
    }

    public allByCSS(cssExpression: string): WebDriverIOElementArray {
        return this.elem.$$(cssExpression);
    }

    public allByCSSInsideElement(element: WebDriverIOElement, cssExpression: string): WebDriverIOElementArray {
        return element.$$(cssExpression);
    }

    public allByClassName(classNameExpression: string): WebDriverIOElementArray {
        return this.elem.$$(`.${classNameExpression}`);
    }

    public allByClassNameInsideElement(element: WebDriverIOElement, classNameExpression: string): WebDriverIOElementArray {
        return element.$$(`.${classNameExpression}`);
    }

    public allByButtonText(text: string): WebDriverIOElementArray {
        return this.allByElementText("button", text);
    }

    public allByButtonTextInsideElement(element: WebDriverIOElement, text: string): WebDriverIOElementArray {
        return this.allByElementTextInsideElement(element, "button", text);
    }

    public allByElementText(tagName: string, text: string): WebDriverIOElementArray {
        return this.elem.$$(`${tagName}*=${text}`);
    }

    public allByElementTextInsideElement(element: WebDriverIOElement, tagName: string, text: string): WebDriverIOElementArray {
        return element.$$(`${tagName}*=${text}`);
    }

    public async waitToBePresent(): Promise<void> {
        await (await this.elem).waitForExist();
    }
}
