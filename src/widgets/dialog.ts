import { Button } from './button';
import { MessagePopup } from './message-popup';
import { Widget } from './widget';
import { Browser } from "../wdio";

export class Dialog extends Widget {

    public async getNumberOfButtons(): Promise<number> {
        return this.byTagName('systelab-dialog-bottom').allByTagName('button').count();
    }

    public async getTitle(): Promise<string> {
        return this.byTagName('systelab-dialog-header').byClassName('slab-dialog-header').getText();
    }

    public getButtonClose(): Button {
        return new Button(this.byCSS('.slab-dialog-close'));
    }

    public async close(): Promise<void> {
        await this.getButtonClose().waitUntilClickable();
        await this.getButtonClose().click();
    }

    public getButtonByName(name: string): Button {
        return new Button(this.byButtonText('name'));
    }

    public getMessagePopup(): MessagePopup {
        return new MessagePopup();
    }

}
