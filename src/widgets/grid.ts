import { Widget } from './widget';
import { WebDriverIOElement, WebDriverIOElementArray } from '../types';
import { ContextMenu } from './context-menu';

export class Grid extends Widget {
	public async getNumberOfRows(): Promise<number> {
		return this.byCSS('.ag-center-cols-container').$$('div[role=row]').length
	}

	public async getValuesInRow(row: number): Promise<string[]> {
		const content: string[] = [];
		const cols:WebDriverIOElementArray = this.allByCSS(`div[row-index="${row}"] div.ag-cell-value`);
		const numberOfRows: number = await cols.length;
		for (let i = 0; i < numberOfRows; i++) {
			const text: string = await (await cols)[i].getText();
			content.push(text);
		}
		return content;
	}

	public async getValueInCell(row: number, columnName: string): Promise<string> {
		const cellSelector = `[role='gridcell'][col-id='` + columnName + `']`;
		const gridCell = (await $$(cellSelector))[row];
		return gridCell.getText();
	}

	public async clickOnRowMenu(row: number): Promise<void> {
		await this.clickOnLeftPinnedCell(row, 'contextMenu');
		await (await this.byTagName('systelab-grid-context-menu')).waitForDisplayed();
	}

	public async clickOnRow(row: number, column: string): Promise<void> {
		await this.clickOnCell(row, column);
	}

	public async clickOnHeader(): Promise<void> {
		// I click explicitly on the first element of the array, unlike in original.
		await (await this.byClassName('ag-header-container').$('.ag-header-row').$$('ag-header-cell'))[0].click();
	}

	public async clickOnHeaderCell(columnIndex: number): Promise<void> {
		await (await this.allByClassName('ag-header-cell-text'))[columnIndex - 1].click();
	}

	public async clickOnCell(row: number, column: string): Promise<void> {
		// I click explicitly on the first element of the array, unlike in original.
		await (await this.byClassName('ag-center-cols-container').$(`div[row-index="${row}"]`).$$(`div[col-id="${column}"`))[0].click();
	}

	public async clickOnLeftPinnedCell(row: number, column: string): Promise<void> {
		// I click explicitly on the first element of the array, unlike in original.
		await (await this.byClassName('ag-pinned-left-cols-container').$(`div[row-index="${row}"]`).$$(`div[col-id="${column}"]`))[0].click();
	}

	public async selectRow(row: number): Promise<void> {
		// I click explicitly on the first element of the array, unlike in original.
		await (await this.allByCSS(`div[row-index="${row}"] div[col-id="selectCol"] input`))[0].click();
	}

	public async getHeaderCaptions(): Promise<string[]> {
		let content: string[] = [];
		const cols: WebDriverIOElementArray = this.allByClassName('ag-header-cell');
		const numberOfFields: number = await cols.length;
		for (let i = 0; i < numberOfFields; i++) {
			const text: string = await (await cols)[i].getText();
			content.push(text);
		}
		return content;
	}

	public async getHeaderCells(): Promise<WebDriverIOElement[]> {
		let content: WebDriverIOElement[] = [];
		const cols: WebDriverIOElementArray = this.allByClassName('ag-header-cell');
		const numberOfFields: number = await cols.length;
		for (let i = 0; i < numberOfFields; i++) {
			content.push((await cols)[i]);
		}
		return content;
	}

	public async getGridHeader(): Promise<string[]> {
		// See if this applies https://github.com/angular/protractor/issues/3818
		const cols: any = this.allByCSS('.ag-header-row .ag-header-cell-label');
		return cols.getText();
	}

	public getMenu(): ContextMenu {
		return new ContextMenu(this.byTagName('systelab-grid-context-menu'));
	}
}
