import { Widget } from './widget';
import { Button } from './button';
import { MessagePopup } from './message-popup';

export class Dialog extends Widget {

	public async getNumberOfButtons(): Promise<number> {
		return (await this.byTagName('systelab-dialog-bottom')).$$('<button>').length
	}

	public async getTitle(): Promise<string> {
		return this.byTagName('systelab-dialog-header').$('.slab-dialog-header').getText();
	}

	public getButtonClose(): Button {
		return new Button((this.byCSS('.slab-dialog-close')));
	}

	public async close(): Promise<void> {
		await this.getButtonClose().click();
	}

	public getButtonByName(name: string): Button {
		return new Button((this.elem).$(`button*=${name}`))
	}

	public getMessagePopup(): MessagePopup {
		return new MessagePopup();
	}

}
