import { Widget } from './widget.js';
import { ElementArrayFinder } from '../wdio/element-finder.js';

export class ToggleSelector extends Widget {
    public async selectOptionByText(optionText: string): Promise<void> {
        await this.byElementText('.slab-option', optionText).click();
    }

    public async selectOptionById(optionId: string) {
        await this.byId(optionId).click();
    }

    public async getSelectedOption(): Promise<string> {
        return this.byCSS('.slab-option.slab-selected').getText();
    }

    public async getOptions(): Promise<string[]> {
        const options: string[] = [];
        const optionsSelector: ElementArrayFinder = this.allByCSS("div[class*='slab-option']");
        const optionsCount: number = await optionsSelector.count();
        for (let i = 0; i < optionsCount; i++) {
            options.push(await optionsSelector.get(i).getText());
        }
        return options;
    }
}
