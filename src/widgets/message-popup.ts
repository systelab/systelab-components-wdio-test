import { Button } from './button.js';
import { Widget } from './widget.js';
import { Browser } from "../wdio/browser.js";


export class MessagePopup extends Widget {
    constructor() {
        super(Browser.byTagName('dialog-view'));
    }

    public async getTextMessage(): Promise<string> {
        return this.byId('popup-message').getText();
    }

    public getButtonYes(): Button {
        return this.getButton('Yes');
    }

    public getButtonNo(): Button {
        return this.getButton('No');
    }

    public getButtonClose(): Button {
        return this.getButton('Close');
    }

    public async close(): Promise<void> {
        await this.getButtonClose().click();
    }

    private getButton(text: string): Button {
        return new Button(this.byTagName("systelab-dialog-bottom").byButtonText(text));
    }
}
