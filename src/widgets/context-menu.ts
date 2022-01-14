import { WebDriverIOElement, WebDriverIOElementArray } from '../types';
import { Widget } from './widget';

export class ContextMenu extends Widget {

    public async getOptions(): Promise<string[]> {
        let content: string[] = [];
        let rows: WebDriverIOElementArray = this.allByTagName('systelab-context-menu-item');
        let numberOfItems: number = await rows.length;
        for (let i = 0; i < numberOfItems; i++) {
            let text: string = await (await this.byTagNameInsideElement(await rows[i] as WebDriverIOElement, '<a>')).getText()
            content.push(text);
        }
        return content;
    }

    public async selectOptionByNumber(i: number): Promise<void> {
        await (await this.allByTagName('systelab-context-menu-item'))[i].click();
    }

    public async selectOptionByText(text: string): Promise<void> {
        await (await this.byElementText('a', text)).click()
    }
}
