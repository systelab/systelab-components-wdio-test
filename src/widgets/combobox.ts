import { Widget } from './widget';

export class ComboBox extends Widget {

    public async click(): Promise<void> {
        await (await this.elem).click();
    }

    public async getOptions(): Promise<string[]> {
        let content: string[] = [];
        let rows = await this.allByCSS('.ag-cell-value');
        let numberOfItems: number = rows.length;
        for (let i = 0; i < numberOfItems; i++) {
            let text: string = await rows[i].getText();
            content.push(text);
        }
        return content;
    }

    public async selectOptionByNumber(i: number): Promise<void> {
        await (await this.allByCSS(`[role='row'][row-index='` + i + `']`))[1].click();
    }

    public async selectOptionByText(text: string): Promise<void> {
        await (await this.byElementText("ag-cell-value", text)).click();
    }
}