import {Widget} from "./widget";

export class Spinner extends Widget {

	public async clear(): Promise<void>  {
		await (await this.byTagName('input')).clearValue();
	}

	public async setText(text: string): Promise<void> {
		await (await this.byTagName('input')).setValue(text);
	}

	public async getText(): Promise<string> {
		return (await this.byTagName('input')).getAttribute('value');
	}

	public async increase(): Promise<void> {
		await (await this.byClassName('input-group-append')).click();
	}

	public async decrease(): Promise<void> {
		await (await this.byClassName('input-group-prepend')).click();
	}
}