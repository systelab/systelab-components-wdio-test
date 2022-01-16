import { Widget } from './widget';
import { ElementArrayFinder } from "../wdio";

export class MultipleComboBox extends Widget {

    public async click(): Promise<void> {
        return this.elem.click();
    }

    public async getOptions(): Promise<string[]> {
        let content: string[] = [];
        let rows: ElementArrayFinder = this.allByCSS('.ag-cell-value');
        let numberOfItems: number = await rows.count();
        for (let i = 0; i < numberOfItems; i++) {
            content.push(await rows.get(i).getText());
        }
        return content;
    }

    public async selectOptionByNumber(i: number): Promise<void> {
        return this.allByCSS('.ag-selection-checkbox').get(i).click();
    }

    public async selectTab(i: number): Promise<void> {
        return this.allByTagName('li').get(i).click();
    }

    public async selectOptionByText(text: string): Promise<void> {
        let index = -1;
        let rows: ElementArrayFinder = this.allByCSS('.ag-cell-value');
        const numberOfItems = await rows.count();
        for (let i = 0; i < numberOfItems; i++) {
            const cellText = await rows.get(i).getText();
            if ( cellText === text )  {
                index = i;
            }
        }
        if ( index != -1 ) {
            await this.selectOptionByNumber(index);
        }
    }

}
