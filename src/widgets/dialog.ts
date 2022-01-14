import { WebDriverIOElement } from './../types/wdio-element-type';
import { Button } from './button';
import { MessagePopup } from './message-popup';
import { Widget } from './widget';

export class Dialog extends Widget {

    public async getNumberOfButtons(): Promise<number> {
        const dialog: WebDriverIOElement = await this.byTagName('systelab-dialog-bottom');
        return this.allByTagNameInsideElement(dialog,'<button>').length;
    }

    public async getTitle(): Promise<string> {
        const dialog = this.byTagName('systelab-dialog-header');
        return (await this.byClassNameInsideElement(dialog, 'slab-dialog-header')).getText();
    }

    public getButtonClose(): Button {
        return new Button((this.byCSS('.slab-dialog-close')));
    }

    public async close(): Promise<void> {
        await browser.waitUntil(() => this.getButtonClose().isClickable())
        await this.getButtonClose().click();
    }

    public getButtonByName(name: string): Button {
        return new Button(this.byCSS(`button*=${name}`));
    }

    public getMessagePopup(): MessagePopup {
        return new MessagePopup();
    }

}
