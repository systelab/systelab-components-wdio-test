import { Widget } from './widget.js';
import { Browser, ElementFinder } from "../wdio/index.js";

export class Datepicker extends Widget {

    public async isPresent(): Promise<boolean> {
        return this.getInputElement().isDisplayed();
    }

    public async getValue(): Promise<string> {
        return this.getInputElement().getAttribute('value');
    }

    public async setValue(value: string): Promise<void> {
        await this.getInputElement().clear();
        await this.getInputElement().write(value);
        await Browser.pressTab();
    }

    private getInputElement(): ElementFinder {
        return this.byTagName('input');
    }

}
