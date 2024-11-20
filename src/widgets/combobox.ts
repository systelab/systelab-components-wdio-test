import { Widget } from './widget.js';
import { ElementArrayFinder, ElementFinder } from "../wdio/index.js";


export class ComboBox extends Widget {
    public async click(): Promise<void> {
        return this.elem.byCSS('.dropdown-toggle').click();
    }

    public async isOptionsListOpen(): Promise<boolean> {
        return await this.byCSS('.ag-root-wrapper').isPresent();
    }

    public async openOptionsList(): Promise<void> {
        const isOpen = await this.isOptionsListOpen();
        if (!isOpen) {
            await this.click();
            await this.waitUntil(async () => this.isOptionsListOpen());
        }
    }

    public async closeOptionsList(): Promise<void> {
        const isOpen = await this.isOptionsListOpen();
        if (isOpen) {
            await this.click();
            await this.waitUntil(async () => !(await this.isOptionsListOpen()));
        }
    }

    public async getOptions(): Promise<string[]> {
        await this.openOptionsList();

        let content: string[] = [];
        let rows: ElementArrayFinder = this.allByCSS('.ag-cell-value');
        let numberOfItems: number = await rows.count();
        for (let i = 0; i < numberOfItems; i++) {
            let text: string = await rows.get(i).getText();
            content.push(text);
        }

        await this.closeOptionsList();

        return content;
    }

    public async selectOptionByText(text: string): Promise<void> {
        await this.openOptionsList();

        let rows: ElementArrayFinder = this.allByCSS('.ag-cell-value');
        let numberOfItems: number = await rows.count();
        for (let i = 0; i < numberOfItems; i++) {
            let optionText: string = await rows.get(i).getHTML(false);
            if (text === optionText) {
                await this.getOptionSelector(i).click();
                return;
            }
        }
    }

    public async selectOptionByNumber(optionIndex: number): Promise<void> {
        await this.openOptionsList();
        await this.getOptionSelector(optionIndex).click();
    }

    private getOptionSelector(optionIndex: number): ElementFinder {
        return this.allByCSS(`[role='row'][row-index='` + optionIndex + `']`).get(1);
    }
}
