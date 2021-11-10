import { Button } from './button';
import { Widget } from './widget';

export class Popup extends Widget {

	public async getText(): Promise<string> {
		return (await this.elem).getText();
	}

	private async getButton(text: string): Promise<Button> {
		return new Button(await this.byTagName('systelab-dialog-bottom')
        .$(`button*=${text}`));
	}
}