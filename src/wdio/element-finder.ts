import { ElementArray } from "webdriverio";
import { Locator, LocatorType } from "./locator";


export enum ElementFinderType {
    Element = "Element",
    ElementArray = "ElementArray"
}

export class ElementFinder {
    public type: ElementFinderType = ElementFinderType.Element;

    constructor(protected locator: Locator, protected parent: ElementFinder | ElementArrayFinder | null = null) {
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
        return new ElementFinder( {type: LocatorType.ElementSelector, selector: `${tagName}*=${text}`}, this);
    }


    // Search list of elements
    public allByTagName(tagName: string): ElementArrayFinder {
        return new ElementArrayFinder({type: LocatorType.ArraySelector, selector: `<${tagName}>`}, this);
    }

    public allByClassName(className: string): ElementArrayFinder {
        return new ElementArrayFinder({type: LocatorType.ArraySelector, selector: `${className}`}, this);
    }

    public allByCSS(cssExpression: string): ElementArrayFinder {
        return new ElementArrayFinder({type: LocatorType.ArraySelector, selector: cssExpression}, this);
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

    public async getAttribute(name: string): Promise<string> {
        return (await this.findElement()).getAttribute(name);
    }

    public async getCSSProperty(name: string): Promise<string> {
        return (await (await this.findElement()).getCSSProperty(name)).value as string;
    }


    // Actions
    public async click(): Promise<void> {
        return (await this.findElement()).click();
    }

    public async moveTo(): Promise<void> {
        return (await this.findElement()).moveTo();
    }

    public async clear(): Promise<void> {
        return (await this.findElement()).clearValue();
    }

    public async write(text: string): Promise<void> {
        return (await this.findElement()).setValue(text);
    }


    // Condition waits
    public async waitToBePresent(timeout: number = 500): Promise<void> {
        await (await this.findElement()).waitForExist({timeout});
    }

    public async waitToBeDisplayed(timeout: number = 500): Promise<void> {
        await (await this.findElement()).waitForDisplayed({timeout});
    }

    public async waitToBeClickable(timeout: number = 500): Promise<void> {
        await (await this.findElement()).waitForClickable({timeout});
    }

    public async waitToBeEnabled(timeout: number = 500): Promise<void> {
        await (await this.findElement()).waitForEnabled({timeout});
    }

    public async waitUntil(condition: () => boolean | Promise<boolean>, timeout: number = 5000): Promise<void> {
        await (await this.findElement()).waitUntil(condition, {timeout});
    }


    // Auxiliary methods
    public async findElement(): Promise<WebdriverIO.Element> {
        if (this.parent) {
            if (this.parent.type == ElementFinderType.Element) {
                return await (await (this.parent as ElementFinder).findElement()).$(this.locator.selector as string);
            }
            else if (this.parent.type == ElementFinderType.ElementArray) {
                return (await (this.parent as ElementArrayFinder).findElements())[this.locator.index as number];
            } else {
                throw "Unknown type for parent element finder: " + this.parent.type;
            }
        } else {
            return $(this.locator.selector as string);
        }
    }

}

export class ElementArrayFinder {
    public type: ElementFinderType = ElementFinderType.ElementArray;

    constructor(protected locator: Locator, protected parent: ElementFinder | null = null) {
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
            return $$(this.locator.selector as string);
        }
    }
}
