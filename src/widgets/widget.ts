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

	public byTagName(tagName: string): WebDriverIOElement {
		return this.elem.$(`<${tagName}>`);
	}

	public byCSS(cssExpression: string): WebDriverIOElement {
		return this.elem.$(cssExpression);
	}

	public byButtonText(buttonExpression: string, text: string): WebDriverIOElement {
		return this.elem.$(`${buttonExpression}*=${text}`);
	}

	public byClassName(classNameExpression: string): WebDriverIOElement {
		return this.elem.$(`.${classNameExpression}`);
	}

	public allById(id: string): WebDriverIOElementArray {
        return this.elem.$$(`#${id}`);
    }

    public allByTagName(tagName: string): WebDriverIOElementArray {
        return this.elem.$$(`<${tagName}>`);
    }

    public allByCSS(cssExpression: string): WebDriverIOElementArray {
        return this.elem.$$(cssExpression);
    }

	public allByClassName(classNameExpression: string): WebDriverIOElementArray {
		return this.elem.$$(`.${classNameExpression}`);
	}

	public async waitToBePresent(): Promise<void> {
		await (await this.elem).waitForExist();
	}
}
