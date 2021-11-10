import { Widget } from './widget';

export class MultipleComboBox extends Widget {

	public async click(): Promise<void> {
		await (await this.elem).click();
	}

	public async getOptions(): Promise<Array<string>> {
		let content: string[] = [];
		let rows = await (await this.elem).$$('.ag-cell-value');
		let numberOfItems: number = rows.length;
		for (let i = 0; i < numberOfItems; i++) {
			let text: string = await rows[i].getText();
			content.push(text);
		}
		return content;
	}

	public async selectOptionByNumber(i: number): Promise<void> {
		 await (await this.allByCSS('.ag-selection-checkbox'))[i].click();
	}
	public async selectTab(i: number): Promise<void> {
		await (await this.allByTagName('li'))[i].click();
	}

	public async selectOptionByText(text: string): Promise<void> {
		let index = -1;
		const rows = await (await this.elem).$$('.ag-cell-value');
		const numberOfItems =  rows.length;
		for (let i = 0; i < numberOfItems; i++) {
			const cellText = await rows[i].getText();
			if  ( cellText === text )  {
				index = i;
			}
		}
		if ( index != -1 ) {
			await this.selectOptionByNumber(index);
		}
	}

}