import { Widget } from './widget';

export class Icon extends Widget {
	public async click(): Promise<void> {
		await (await this.elem).click();
	}
}