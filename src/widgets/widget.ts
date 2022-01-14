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

	public byButtonText(buttonExpression: string, text: string): WebDriverIOElement {
		return this.elem.$(`${buttonExpression}*=${text}`);
	}

	public byButtonTextInsideElement(element: WebDriverIOElement, buttonExpression: string, text: string): WebDriverIOElement {
		return element.$(`${buttonExpression}*=${text}`);
	}

	public byClassName(classNameExpression: string): WebDriverIOElement {
		return this.elem.$(`.${classNameExpression}`);
	}

	public byClassNameInsideElement(element: WebDriverIOElement, classNameExpression: string): WebDriverIOElement {
		return element.$(`.${classNameExpression}`);
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

	public async waitToBePresent(): Promise<void> {
		await (await this.elem).waitForExist();
	}
}
