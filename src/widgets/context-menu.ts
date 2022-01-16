import { Widget } from './widget';
import { ElementArrayFinder } from "../wdio";


export class ContextMenu extends Widget {

    public async getOptions(): Promise<string[]> {
        let content: string[] = [];
        let rows: ElementArrayFinder = this.allByTagName('systelab-context-menu-item');
        let numberOfItems: number = await rows.count();
        for (let i = 0; i < numberOfItems; i++) {
            content.push(await rows.get(i).byTagName('a').getText());
        }
        return content;
    }

    public async selectOptionByNumber(i: number): Promise<void> {
        return this.allByTagName('systelab-context-menu-item').get(i).click();
    }

    public async selectOptionByText(text: string): Promise<void> {
        return this.byElementText('a', text).click();
    }
}
