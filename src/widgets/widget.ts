import { ChainablePromiseElement } from "webdriverio";


type WebDriverIOElement = WebdriverIO.Element | ChainablePromiseElement<Promise<WebdriverIO.Element>>;

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

	public async waitToBePresent(): Promise<void> {
		await browser.waitUntil(
			async () => (await this.elem).isDisplayed()
		);
	}
}
