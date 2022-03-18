import { Widget } from './widget';
import { ElementArrayFinder } from "../wdio";


export class ComboBox extends Widget {
    public async click(): Promise<void> {
        return this.elem.byCSS('dropdown-toggle').click();
    }

    public async isOptionsListOpen(): Promise<boolean> {
        const nOptions = await this.allByCSS('.ag-cell-value').count();
        return nOptions > 0;
    }

    public async openOptionsList(): Promise<void> {
        const isOpen = await this.isOptionsListOpen();
        if (!isOpen) {
            await this.elem.click();
            await this.waitUntil(async () => this.isOptionsListOpen());
        }
    }

    public async closeOptionsList(): Promise<void> {
        const isOpen = await this.isOptionsListOpen();
        if (isOpen) {
            await this.elem.click();
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
        const options = await this.getOptions();
        const optionIndex = options.findIndex((option) => option === text);
        return this.selectOptionByNumber(optionIndex);
    }

    public async selectOptionByNumber(i: number): Promise<void> {
        await this.openOptionsList();
        await this.allByCSS(`[role='row'][row-index='` + i + `']`).get(1).click();
    }
}
