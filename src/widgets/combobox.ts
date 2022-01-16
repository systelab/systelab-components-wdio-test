import { Widget } from './widget';
import { ElementArrayFinder } from "../wdio";


export class ComboBox extends Widget {

    public async click(): Promise<void> {
        return this.elem.click();
    }

    public async getOptions(): Promise<string[]> {
        let content: string[] = [];
        let rows: ElementArrayFinder = this.allByCSS('.ag-cell-value');
        let numberOfItems: number = await rows.count();
        for (let i = 0; i < numberOfItems; i++) {
            let text: string = await rows.get(i).getText();
            content.push(text);
        }
        return content;
    }

    public async selectOptionByNumber(i: number): Promise<void> {
        return this.allByCSS(`[role='row'][row-index='` + i + `']`).get(1).click();
    }

    public async selectOptionByText(text: string): Promise<void> {
        return this.byElementText("ag-cell-value", text).click();
    }
}
