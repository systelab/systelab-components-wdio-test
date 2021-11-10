import { Widget } from './widget';
import { WebDriverIOElement } from '../types';

export class Datepicker extends Widget {

	public async isPresent(): Promise<boolean> {
		return  (await this.getInputElement()).isDisplayed();
	}

	public async getValue(): Promise<string> {
		return (await this.getInputElement()).getAttribute('value');
	}

	public async setValue(value: string): Promise<void> {
		await this.clear(await this.getInputElement());
		await (await this.getInputElement()).setValue(value);
		// send keys tab - set focus off...
	}

	private getInputElement(): WebDriverIOElement {
		return this.byCSS('input');
	}

	private async clear(elem: WebDriverIOElement): Promise<void> {
		await (await elem).clearValue();
	}
}
