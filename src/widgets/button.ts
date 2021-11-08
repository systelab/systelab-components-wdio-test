import { Widget } from './widget';

export class Button extends Widget {

	public async click(): Promise<void> {
		await (await this.elem).click();
	}
}
