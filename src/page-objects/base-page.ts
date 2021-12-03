import { WebDriverIOElement, WebDriverIOElementArray } from "../types/wdio-element-type"


export class BasePage {

    protected current: WebDriverIOElement;

    constructor(private readonly tagName: string) {
        this.current = browser.$(`<${tagName}>`);
    }

    public getElementFinder(): WebDriverIOElement {
        return this.current;
    }

    public byId(id: string): WebDriverIOElement {
        return this.current.$(`#${id}`);
    }

    public byTagName(tagName: string): WebDriverIOElement {
        return this.current.$(`<${tagName}>`);
    }

    public byCSS(cssExpression: string): WebDriverIOElement {
        return this.current.$(cssExpression);
    }

    public byButtonText(buttonExpression: string, text: string): WebDriverIOElement {
        return this.current.$(`${buttonExpression}*=${text}`);
	}

	public byClassName(classNameExpression: string): WebDriverIOElement {
        return this.current.$(`${classNameExpression}`);
	}

    public allById(id: string): WebDriverIOElementArray {
        return this.current.$$(`#${id}`);
    }

    public allByTagName(tagName: string): WebDriverIOElementArray {
        return this.current.$$(`<${tagName}>`);
    }

    public allByCSS(cssExpression: string): WebDriverIOElementArray {
        return this.current.$$(cssExpression);
    }

    public allByClassName(classNameExpression: string): WebDriverIOElementArray {
        return this.current.$$(`${classNameExpression}`);
	}

    public async waitToBePresent(): Promise<void> {
        await (await this.current).waitForExist();
    }
}
