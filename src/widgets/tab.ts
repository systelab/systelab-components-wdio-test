import { Widget } from './widget';

export class Tab extends Widget {

	public async getText(): Promise<string> {
		return await (await this.byTagName('span')).getText();
	}
}
