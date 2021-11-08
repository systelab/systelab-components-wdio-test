import { Widget } from './widget';
import { Button } from './button';

export class MessagePopup extends Widget {
	constructor() {
		super(browser.$('<dialog-view>'));
	}

	public async getTextMessage(): Promise<string> {
		return (await this.byId('popup-message')).getText();
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
		return new Button(this.elem.$("<systelab-dialog-bottom>").$(`button=${text}`));
	}
}
