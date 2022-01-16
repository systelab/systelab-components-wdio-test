import { ContextMenu } from './context-menu';
import { Widget } from './widget';
import { ElementArrayFinder, ElementFinder } from "../wdio";


export class Grid extends Widget {
    public async getNumberOfRows(): Promise<number> {
        return this.byCSS('.ag-center-cols-container').allByCSS('div[role=row]').count();
    }

    public async getValuesInRow(row: number): Promise<string[]> {
        const content: string[] = [];
        const cols: ElementArrayFinder = this.allByCSS(`div[row-index="${row}"] div.ag-cell-value`);
        const numberOfRows: number = await cols.count();
        for (let i = 0; i < numberOfRows; i++) {
            content.push(await cols.get(i).getText());
        }
        return content;
    }

    public async getValueInCell(row: number, columnName: string): Promise<string> {
        const cellSelector = `[role='gridcell'][col-id='` + columnName + `']`;
        const gridCell: ElementFinder = this.allByCSS(cellSelector).get(row);
        return gridCell.getText();
    }

    public async clickOnRowMenu(row: number): Promise<void> {
        await this.clickOnLeftPinnedCell(row, 'contextMenu');
        await this.byTagName('systelab-grid-context-menu').waitToBeDisplayed();
    }

    public async clickOnRow(row: number, column: string): Promise<void> {
        await this.clickOnCell(row, column);
    }

    public async clickOnHeader(): Promise<void> {
        // I click explicitly on the first element of the array, unlike in original.
        const container: ElementFinder = this.byClassName('ag-header-container');
        const headerRow: ElementFinder = container.byCSS('.ag-header-row');
        const headerCells: ElementArrayFinder = headerRow.allByCSS('.ag-header-cell');
        await headerCells.get(0).click();
    }

    public async clickOnHeaderCell(columnIndex: number): Promise<void> {
        return this.allByClassName('ag-header-cell-text').get(columnIndex - 1).click();
    }

    public async clickOnCell(row: number, column: string): Promise<void> {
        // I click explicitly on the first element of the array, unlike in original.
        const headerCells = this.getCells(this.byClassName('ag-center-cols-container'),row,column);
        return headerCells.get(0).click();
    }

    public async clickOnLeftPinnedCell(row: number, column: string): Promise<void> {
        // I click explicitly on the first element of the array, unlike in original.
        const headerCells = await this.getCells(this.byClassName('ag-pinned-left-cols-container'),row,column);
        return headerCells.get(0).click();
    }

    public async selectRow(row: number): Promise<void> {
        // I click explicitly on the first element of the array, unlike in original.
        return this.allByCSS(`div[row-index="${row}"] div[col-id="selectCol"] input`).get(0).click();
    }

    public async getHeaderCaptions(): Promise<string[]> {
        let content: string[] = [];
        const cols: ElementArrayFinder = this.allByClassName('ag-header-cell');
        const numberOfFields: number = await cols.count();
        for (let i = 0; i < numberOfFields; i++) {
            content.push(await cols.get(i).getText());
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

    private getCells(container: ElementFinder, row: number, column: string): ElementArrayFinder {
        const rowSelector = container.byCSS(`div[row-index="${row}"]`);
        return rowSelector.allByCSS(`div[col-id="${column}"]`);
    }
}
